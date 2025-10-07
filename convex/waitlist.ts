import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to add email to waitlist
export const add = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("This email is already on the waitlist!");
    }

    // Add to waitlist
    const id = await ctx.db.insert("waitlist", {
      email: args.email,
      createdAt: Date.now(),
    });

    return id;
  },
});

// Query to get all waitlist entries (for admin dashboard)
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("waitlist")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

// Query to count waitlist entries
export const count = query({
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlist").collect();
    return entries.length;
  },
});
