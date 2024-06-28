import { ConvexError, v } from "convex/values"
import { query } from "./_generated/server"
import { getUserByClerkId } from "./_utils"

export const get = query({ args: { id: v.id("conversations") }, handler: async (ctx, args) => {
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

    const converasation = await ctx.db.get(args.id)
    
    if(!converasation){
        throw new ConvexError("Conversation not found")
    }

    const membership = await ctx.db.query("conversationMembers").withIndex("by_memberId_conversationId", (q) => q.eq("memberId", currentUser._id).eq("conversationId", converasation._id)).unique()
    
    if(!membership){
        throw new ConvexError("You aren't a member of this conversation")
    }

    const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", (q) => q.eq("conversationId", args.id)).collect()

    if(!converasation.isGroup){
        const otherMembership = allConversationMemberships.filter(membership => membership.memberId !== currentUser._id)[0]
        const otherMemberDetails = await ctx.db.get(otherMembership.memberId)
        
        return {
            ...converasation,
            otherMember: {
                ...otherMemberDetails,
                lastSeenMessageId: otherMembership.lastSeenMessage
            },
            otherMembers: null
        }
    }

}})