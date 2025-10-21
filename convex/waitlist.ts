import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { auth } from "./auth";

// ============================================
// GIST ANSWERS WAITLIST FUNCTIONS
// ============================================

export const addGist = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
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
      name: args.name,
      image: args.image,
      createdAt: Date.now(),
    });

    console.log("[WAITLIST] User added, scheduling email for:", args.email);

    // Query total count (waitlistGistAnswersai + users)
    const waitlistEntries = await ctx.db.query("waitlistGistAnswersai").collect();
    const usersEntries = await ctx.db.query("users").collect();
    const totalCount = waitlistEntries.length + usersEntries.length;

    // Send confirmation email (non-blocking)
    try {
      await ctx.scheduler.runAfter(0, internal.email.sendWaitlistConfirmation, {
        email: args.email,
        name: args.name,
      });
      console.log("[WAITLIST] Email scheduled successfully");
    } catch (error) {
      console.error("[WAITLIST] Email scheduling failed:", error);
      // Don't throw - still return success for waitlist signup
    }

    // Send Slack notification (non-blocking)
    try {
      await ctx.scheduler.runAfter(0, internal.slack.sendWaitlistNotification, {
        email: args.email,
        name: args.name,
        isOauth: false,
        totalCount: totalCount,
      });
      console.log("[WAITLIST] Slack notification scheduled successfully");
    } catch (error) {
      console.error("[WAITLIST] Slack notification scheduling failed:", error);
      // Don't throw - still return success for waitlist signup
    }

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
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    isOauth: v.optional(v.boolean()),
  },
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
      name: args.name,
      image: args.image,
      createdAt: Date.now(),
      isOauth: args.isOauth ?? false,
    });

    console.log("[WAITLIST] User added, scheduling email for:", args.email);

    // Send confirmation email (non-blocking)
    try {
      await ctx.scheduler.runAfter(0, internal.email.sendWaitlistConfirmation, {
        email: args.email,
        name: args.name,
      });
      console.log("[WAITLIST] Email scheduled successfully");
    } catch (error) {
      console.error("[WAITLIST] Email scheduling failed:", error);
      // Don't throw - still return success for waitlist signup
    }

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

// ============================================
// OAUTH SIGNUP NOTIFICATION
// ============================================

export const notifyOAuthSignup = mutation({
  handler: async (ctx) => {
    console.log("[WAITLIST] Processing OAuth signup notification");

    // Get authenticated user
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      console.error("[WAITLIST] No authenticated user found for OAuth notification");
      return { success: false, error: "Not authenticated" };
    }

    // Fetch user record
    const user = await ctx.db.get(userId);
    if (!user) {
      console.error("[WAITLIST] User record not found:", userId);
      return { success: false, error: "User not found" };
    }

    const email = user.email || "No email provided";
    const name = user.name || undefined;

    console.log("[WAITLIST] OAuth user found:", email);

    // Query total count (waitlistGistAnswersai + users)
    const waitlistEntries = await ctx.db.query("waitlistGistAnswersai").collect();
    const usersEntries = await ctx.db.query("users").collect();
    const totalCount = waitlistEntries.length + usersEntries.length;

    // Send confirmation email (non-blocking)
    try {
      await ctx.scheduler.runAfter(0, internal.email.sendWaitlistConfirmation, {
        email: email,
        name: name,
      });
      console.log("[WAITLIST] Email scheduled successfully for OAuth user");
    } catch (error) {
      console.error("[WAITLIST] Email scheduling failed for OAuth user:", error);
      // Don't throw - still return success
    }

    // Send Slack notification (non-blocking)
    try {
      await ctx.scheduler.runAfter(0, internal.slack.sendWaitlistNotification, {
        email: email,
        name: name,
        isOauth: true,
        totalCount: totalCount,
      });
      console.log("[WAITLIST] Slack notification scheduled successfully for OAuth user");
    } catch (error) {
      console.error("[WAITLIST] Slack notification scheduling failed for OAuth user:", error);
      // Don't throw - still return success
    }

    return { success: true };
  },
});
