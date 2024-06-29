import { ConvexError } from "convex/values"
import { MutationCtx, QueryCtx, query } from "./_generated/server"
import { getUserByClerkId } from "./_utils"
import { Id } from "./_generated/dataModel"

export const get = query({ args: {}, handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(!identity){
        throw new Error("Unauthorized!")
    }

    const currentUser = await getUserByClerkId({
        ctx, clerkId: identity.subject
    })

    if(!currentUser){
        throw new ConvexError("User could not be found")
    }

    const conversationsMemberships = await ctx.db.query("conversationMembers").withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id)).collect()

    const conversations = await Promise.all(conversationsMemberships?.map(async (membership) => {
        const conversation = await ctx.db.get(membership.conversationId)
        if(!conversation){
            throw new ConvexError("Conversations could not be found")
        }
        return conversation;
    }))

    const conversationsWithDetails = await Promise.all(conversations.map(async (conversation, index) => {
    const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", (q) => q.eq("conversationId", conversation?._id)).collect()

    const lastMessage = await lastMessageDetails({ctx, id: conversation.lastMessageId})

        if(conversation.isGroup){
            return { conversation, lastMessage }
        } else{
            const otherMemberships = allConversationMemberships.filter((membership) => membership.memberId !== currentUser._id)[0]

            const otherMember = await ctx.db.get(otherMemberships.memberId)

            return { conversation, otherMember, lastMessage }
        }
    }))

    return conversationsWithDetails;
}})

const lastMessageDetails = async({ctx, id}: {ctx: QueryCtx | MutationCtx; id: Id<"messages"> | undefined}) => {

    if(!id) return null
    const message = await ctx.db.get(id)
    if(!message) return null
    const sender = await ctx.db.get(message.senderId)
    if(!sender) return null
    const content = getMessageContent(message.type, message.content as unknown as string)
    return { content, sender: sender.username}
}
const getMessageContent = (type: string, content: string) => {
    switch(type) {
        case "text":
            return content
        default:
            return "[Non-text]"
    }
}