import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user.email === "hazratummar9@gmail.com") {
                return true;
            }
            return false;
        },
    },
    pages: {
        error: "/auth/error", // Error code passed in query string as ?error=
    },
});

export { handler as GET, handler as POST };
