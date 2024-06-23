import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
    args: {
        email: v.string()
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if(!identity){
            throw new ConvexError("Unauthorized!")
        }
        if(args.email === identity.email){
            throw new ConvexError("Cannot send a request to yourself!")
        }
        
    }
})