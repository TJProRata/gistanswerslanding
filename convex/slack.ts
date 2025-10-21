"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const sendWaitlistNotification = internalAction({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    isOauth: v.boolean(),
    totalCount: v.number(),
  },
  handler: async (ctx, args) => {
    console.log("[SLACK] Sending waitlist notification for:", args.email);

    // Validate webhook URL exists
    if (!process.env.SLACK_WEBHOOK_URL) {
      console.error("[SLACK] CRITICAL: SLACK_WEBHOOK_URL not configured in Convex environment!");
      // Don't throw - we don't want to block waitlist signup
      return { success: false, error: "Slack webhook not configured" };
    }

    try {
      // Format timestamp
      const now = new Date();
      const timestamp = now.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Determine source
      const source = args.isOauth ? "OAuth Google" : "Manual Form";

      // Build Slack message
      const message = {
        text: `🎉 New Waitlist Signup!

📧 Email: ${args.email}
👤 Name: ${args.name || "Not provided"}
🔐 Source: ${source}
⏰ Time: ${timestamp} PST
📊 Total Signups: ${args.totalCount}`,
      };

      console.log("[SLACK] Sending message:", message);

      // Send to Slack webhook
      const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[SLACK] Webhook request failed:", response.status, errorText);
        return { success: false, error: `HTTP ${response.status}: ${errorText}` };
      }

      console.log("[SLACK] Notification sent successfully!");
      return { success: true };
    } catch (error) {
      console.error("[SLACK] Error sending notification:", error);

      // Log detailed error information for debugging
      if (error instanceof Error) {
        console.error("[SLACK] Error name:", error.name);
        console.error("[SLACK] Error message:", error.message);
        console.error("[SLACK] Error stack:", error.stack);
      }

      // Don't throw - we don't want to block waitlist signup
      console.error("[SLACK] Non-critical Slack error, user added to waitlist successfully");
      return { success: false, error: String(error) };
    }
  },
});
