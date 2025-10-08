import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ============================================
// GIST ANSWERS WAITLIST FUNCTIONS
// ============================================

export const addGist = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlistGistAnswersai")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("This email is already on the waitlist!");
    }

    // Add to waitlistGistAnswersai
    const id = await ctx.db.insert("waitlistGistAnswersai", {
      email: args.email,
      createdAt: Date.now(),
    });

    return id;
  },
});

export const getAllGist = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("waitlistGistAnswersai")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const countGist = query({
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlistGistAnswersai").collect();
    return entries.length;
  },
});

// ============================================
// GET ASK ANYTHING WAITLIST FUNCTIONS
// ============================================

export const addAsk = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlistgetaskanything")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("This email is already on the waitlist!");
    }

    // Add to waitlistgetaskanything
    const id = await ctx.db.insert("waitlistgetaskanything", {
      email: args.email,
      createdAt: Date.now(),
    });

    return id;
  },
});

export const getAllAsk = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("waitlistgetaskanything")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const countAsk = query({
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlistgetaskanything").collect();
    return entries.length;
  },
});
