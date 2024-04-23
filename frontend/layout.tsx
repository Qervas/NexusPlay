// // app/layout/layout.tsx
// import React from 'react';

// const Layout = ({ children }: { children: React.ReactNode }) => {
// 	return (
// 		<div>
// 			<header>
// 				{/* Your header content */}
// 			</header>
// 			<main>{children}</main>
// 			<footer>
// 				{/* Your footer content */}
// 			</footer>
// 		</div>
// 	);
// };

// export default Layout;
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import Provider from "./app/client-provider";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log here to check the session

  return (
    <html lang="en">
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}