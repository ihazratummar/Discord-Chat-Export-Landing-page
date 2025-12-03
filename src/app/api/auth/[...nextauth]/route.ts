
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
            // Restrict access to specific email
            const allowedEmail = "hazratummar9@gmail.com";
            return user.email === allowedEmail;
        },
    },
    // Ensure cookies work on both localhost and production
    useSecureCookies: process.env.NODE_ENV === 'production',

    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    pages: {
        error: "/auth/error", // Error code passed in query string as ?error=
    },
});

export { handler as GET, handler as POST };
