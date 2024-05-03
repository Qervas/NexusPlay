// app/layout.tsx: layout
// import { getServerSession } from "next-auth";
// import authOptions from './config/authConfig';
// import Provider from "./client-provider";

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await getServerSession(authOptions);
//   // console.log here to check the session

//   return (
//     <html lang="en">
//       <body>
//         <Provider session={session}>{children}</Provider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
'use client';
import { SessionProvider } from 'next-auth/react';
import './styles/cyberpunk.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
