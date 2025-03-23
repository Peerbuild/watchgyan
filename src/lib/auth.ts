import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      if (
        profile?.email &&
        process.env.ADMIN_EMAILS!.split(",").includes(profile?.email)
      ) {
        return true;
      }
      return false;
    },
  },
});
