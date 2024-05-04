// app/config/authConfig.js
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import axios from 'axios'; 


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Send user data to your Express backend
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
          email: user.email,
          name: user.name,
          image: user.image
        });
        return true;
      } catch (error) {
        console.error('Failed to update user data in backend:', error);
        return false;  // Return false to prevent login if backend update fails
      }
    }
  }
};
export default authOptions;