import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),
    })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

    requests: defineTable({
        sender: v.id("users"),
        receiver: v.id("users"),
    })
    .index("by_receiver", ["receiver"])
    .index("by_receiver_sender", ["receiver", "sender"])
});