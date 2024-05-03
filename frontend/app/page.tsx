// app/page.tsx (Server Component)
import React from 'react';
import getData from './hooks/getData';
import HomePage from './HomePage'; // Import the Client Component
import { getServerSession } from 'next-auth/next';
import authOptions from './config/authConfig';

export default async function Page() {
  const session = await getServerSession(authOptions); // Get the session on the server-side
  const { games, session: clientSession } = await getData(session);

  return <HomePage games={games} session={clientSession} />;
}