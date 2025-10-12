import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ============================================
// CONTACT FORM FUNCTIONS
// ============================================

export const submitContact = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.string(),
    websiteUrl: v.string(),
    interests: v.array(v.string()),
    message: v.optional(v.string()),
    receiveUpdates: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("This email has already submitted a contact form!");
    }

    // Add to contactSubmissions
    const id = await ctx.db.insert("contactSubmissions", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      organization: args.organization,
      websiteUrl: args.websiteUrl,
      interests: args.interests,
      message: args.message,
      receiveUpdates: args.receiveUpdates,
      createdAt: Date.now(),
    });

    return id;
  },
});

export const getAllContacts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const getContactByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const countContacts = query({
  handler: async (ctx) => {
    const entries = await ctx.db.query("contactSubmissions").collect();
    return entries.length;
  },
});
