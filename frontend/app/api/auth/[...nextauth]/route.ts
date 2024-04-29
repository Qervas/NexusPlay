// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import authOptions from '../../../config/authConfig'; // Adjust the path as necessary

const authHandler = NextAuth(authOptions);

export const GET = authHandler;
export const POST = authHandler;
