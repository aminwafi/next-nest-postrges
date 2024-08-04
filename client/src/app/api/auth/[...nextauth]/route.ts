import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/error',
  },
  callbacks: {
    async redirect({ url , baseUrl } : { url: any, baseUrl: any }) {
      if (url.startsWith(baseUrl)) {
        return Promise.resolve('/dashboard');
      }
      return Promise.resolve(url);
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
