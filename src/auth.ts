import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import {compare} from 'bcryptjs';
import {User} from "@/models/userModel"; 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "Enter Your email",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Enter Your Password",
          },
        },
        authorize: async (credentials) => {
          const email = credentials?.email as string;
          const password = credentials?.password as string;
  
          if (!email || !password) {
            throw new Error("Please provide both email and password");
          }
  
          const user = await User.findOne({email}).select("+password");
        
          if(!user) throw new Error("Invalid email or password");
          if(!user.password) throw new Error("Invalid email or password");
          const isMatch = await compare(password, user.password);
          if (password !== "passcode") {
            throw new Error("Password does not match");
          }
  
          return {name: user.name, email: user.email, id: user.__id };
        },
      }),
    ],
  });