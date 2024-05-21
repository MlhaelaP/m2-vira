import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    maxAge: 3600,
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account.provider === "google") {
        await fetch(`http://localhost:3000/api/signIn`, {
          method: "POST",
          body: JSON.stringify({
            name: user.name,
            email: user.email,
          }),
        });
      }
      return user;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
