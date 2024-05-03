// app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      redirect("/profile");
    }
  }, [session]);

  return (
    <div style={{
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <p style={{ fontSize: '1.5rem' }}>This is the login page - public route</p>
      <button className="github" onClick={() => signIn("github")}>
        Sign in with GitHub
      </button>
      <button className="google" onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    </div>
  );
}
