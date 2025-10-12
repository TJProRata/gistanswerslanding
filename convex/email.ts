"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWaitlistConfirmation = internalAction({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    console.log("[EMAIL] Sending confirmation to:", args.email);

    // Validate API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("[EMAIL] CRITICAL: RESEND_API_KEY not configured in Convex environment!");
      throw new Error("Email service not configured. Please contact support.");
    }

    try {
      const data = await resend.emails.send({
        from: "Gist Answers <onboarding@resend.dev>",
        to: [args.email],
        subject: "You're on the Gist Answers waitlist! 🎉",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="background: linear-gradient(135deg, #FFAF07 0%, #926DD7 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600;">Welcome to Gist Answers!</h1>
  </div>

  <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

    <p style="font-size: 16px; margin-bottom: 20px;">
      Thanks for joining the waitlist. You're one step closer to transforming how visitors engage with your content.
    </p>

    <h2 style="color: #926DD7; font-size: 24px; margin-top: 30px; margin-bottom: 15px;">What's Next?</h2>

    <p style="font-size: 16px; margin-bottom: 15px;">
      We're working hard to bring Gist Answers to more publishers. Here's what you can expect:
    </p>

    <ul style="font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
      <li><strong>Early Access:</strong> You'll be among the first to know when we're ready for new partners</li>
      <li><strong>Custom Demo:</strong> See how Gist Answers works with your specific content</li>
      <li><strong>Exclusive Updates:</strong> Get insights on AI search and visitor engagement</li>
    </ul>

    <h2 style="color: #926DD7; font-size: 24px; margin-top: 30px; margin-bottom: 15px;">What is Gist Answers?</h2>

    <p style="font-size: 16px; margin-bottom: 25px;">
      Gist Answers is a customizable AI search engine that keeps visitors on your site with instant, accurate answers. It's powered by your content and enhanced by a licensed library of 700+ trusted publications.
    </p>

    <h2 style="color: #926DD7; font-size: 24px; margin-top: 30px; margin-bottom: 15px;">Questions?</h2>

    <p style="font-size: 16px; margin-bottom: 30px;">
      Reply to this email or reach out to us at <a href="mailto:hello@prorata.ai" style="color: #926DD7; text-decoration: none;">hello@prorata.ai</a>.
    </p>

    <p style="font-size: 16px; margin-bottom: 5px;">
      We'll be in touch soon!
    </p>

    <p style="font-size: 16px; font-weight: 600; color: #926DD7;">
      The ProRata Team
    </p>

  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p style="margin: 5px 0;">© ${new Date().getFullYear()} ProRata. All rights reserved.</p>
    <p style="margin: 5px 0;">
      <a href="https://www.gistanswers.ai" style="color: #926DD7; text-decoration: none;">Visit our website</a>
    </p>
  </div>

</body>
</html>
        `,
      });

      console.log("[EMAIL] Email sent successfully! Message ID:", data.data?.id);
      return { success: true, messageId: data.data?.id };
    } catch (error) {
      console.error("[EMAIL] Error sending email:", error);

      // Log detailed error information for debugging
      if (error instanceof Error) {
        console.error("[EMAIL] Error name:", error.name);
        console.error("[EMAIL] Error message:", error.message);
        console.error("[EMAIL] Error stack:", error.stack);
      }

      // Check for common Resend errors
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("API key")) {
        console.error("[EMAIL] CRITICAL: Invalid or missing Resend API key");
        throw new Error("Email service configuration error. Please contact support.");
      }

      if (errorMessage.includes("domain")) {
        console.error("[EMAIL] CRITICAL: Domain not verified in Resend");
        throw new Error("Email domain not verified. Please contact support.");
      }

      // For other errors, don't throw - we don't want to block waitlist signup
      console.error("[EMAIL] Non-critical email error, user added to waitlist successfully");
      return { success: false, error: String(error) };
    }
  },
});
