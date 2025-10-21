import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId, existingUserId }) {
      // Only process for NEW OAuth users
      if (!existingUserId) {
        const user = await ctx.db.get(userId);

        if (user?.email) {
          // Schedule notification for new OAuth signup
          await ctx.scheduler.runAfter(0, internal.waitlist.addOAuthUserInternal, {
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
      }
    },
  },
});
