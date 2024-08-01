import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } } : { auth: any, request: { nextUrl : any } }) {
            const isLoggedIn = !!auth?.user;

            const isOnProtected = !(nextUrl.pathname.startsWith('/login'));

            if (isOnProtected) {
                if (isLoggedIn) return true;
                return false; // redirected to /login
            } else if (isLoggedIn) {
                // redirected to homepage
                return Response.redirect(new URL('/', nextUrl));
            }

            return true;
        },
    },

    providers: [],
} satisfies NextAuthConfig;