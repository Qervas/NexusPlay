// app/hooks/getData.tsx (Server Component)
import { Session } from 'next-auth';
import { Game } from '../config/types';

async function getData(session: Session | null): Promise<{ games: Game[], session: any }> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/games`);  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const games: Game[] = await response.json();
  return { games, session };
}

export default getData;