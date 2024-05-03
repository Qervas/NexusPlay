// app/HomePage.tsx
'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Game } from './config/types';
import GameThumbnail from './components/GameThumbnails';
import Layout from './layout';
import Head from 'next/head';
import authOptions from './config/authConfig';
import getData from './hooks/getData';

interface HomePageProps {
  games: Game[];
  session: any; // Replace with the actual session type
}

import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);
	const { games, session: clientSession } = await getData(session);

	return { props: { games, clientSession } };
}
  

const HomePage: React.FC<HomePageProps> = ({ games, session }) => {
  const { data: clientSession } = useSession();

  return (
    <Layout>
      <Head>
        <title>Welcome to GameHub</title>
      </Head>
      <header>
        <h1>Welcome to GameHub</h1>
        {!clientSession ? (
          <button onClick={() => signIn()}>Sign In</button>
        ) : (
          <>
            <p>Welcome, {clientSession.user?.name}</p>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        )}
      </header>
      <main>
        <div className="games-grid">
          {games.map((game: Game) => (
            <GameThumbnail key={game.id} game={game} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;