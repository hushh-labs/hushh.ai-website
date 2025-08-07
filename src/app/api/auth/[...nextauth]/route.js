import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = "https://rpmzykoxqnbozgdoqbpc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔄 NextAuth Route File Loaded!');

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: {
        appleId: process.env.APPLE_CLIENT_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      }
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          credentials.email === "example@example.com" &&
          credentials.password === "password123"
        ) {
          return {
            id: 1,
            name: credentials.name,
            email: credentials.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  secret: "fd7c5187bee6b04ae7b2a65b6a756cf96e6b34dc6b4fd3cef1ad2b13e42a4a1b",
  callbacks: {
    async session({ session, token }) {
      console.log('🎯 ===== SESSION CALLBACK START =====');
      console.log('🚀 SESSION CALLBACK TRIGGERED!');
      console.log('Session received:', session);
      console.log('Token received:', token);
      
      if (session.user && session.user.email) {
        session.accessToken = token.accessToken;
        session.id = token.uid || token.sub;
        session.userName = token.userName;
        session.token = {
          email: session.user.email,
          name: session.user.name,
          sub: token.sub
        };
        console.log('Session from NextAuth:', session);
        
        try {
          // First, save user profile to Supabase dev_api_userprofile table
          console.log('Saving user profile to database...');
          
          const profileData = {
            mail: session.user.email,
            user_id: session.id,
            firstname: session.user.name
          };

          console.log('Profile data to save:', profileData);

          const { data: upsertData, error: upsertError } = await supabase
            .from('dev_api_userprofile')
            .upsert([profileData], { 
              onConflict: 'mail',
              ignoreDuplicates: false 
            })
            .select();

          if (upsertError) {
            console.error('Error saving user profile:', upsertError);
          } else {
            console.log('User profile saved successfully:', upsertData);
          }


        } catch (error) {
          console.error("Error fetching API key:", error);
        }
      }
      return session;
    },
    async jwt({token, user, account}) {
      console.log('🔥 ===== JWT CALLBACK START =====');
      console.log('🚀 JWT CALLBACK TRIGGERED!');
      console.log('User:', user);
      console.log('Token:', token);
      console.log('Account:', account);
      
      // User Id is unique identifier id === uid
      if (user?.id) {
          token.uid = user.id
      }
      if (user?.userName) {
          token.userName = user.userName;
      }
      
      // Save user profile to Supabase when user first signs in
      if (user && account && account.provider === 'google') {
        console.log('🔥 Google sign-in detected, saving user profile...');
        
        try {
          const profileData = {
            mail: user.email,
            user_id: user.id,
            firstname: user.name
          };

          console.log('Profile data to save:', profileData);

          const { data: upsertData, error: upsertError } = await supabase
            .from('dev_api_userprofile')
            .upsert([profileData], { 
              onConflict: 'mail',
              ignoreDuplicates: false 
            })
            .select();

          if (upsertError) {
            console.error('❌ Error saving user profile:', upsertError);
          } else {
            console.log('✅ User profile saved successfully:', upsertData);
          }
        } catch (error) {
          console.error('❌ Error in profile save process:', error);
        }
      }
      
      return token
   },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

console.log('🚀 NextAuth Handler Created!');

export { handler as GET, handler as POST };
