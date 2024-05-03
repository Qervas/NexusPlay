import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET method called");

  // Fetching the games data from the public directory using the environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const gamesResponse = await fetch(`${baseUrl}/games.json`);
  
  if (!gamesResponse.ok) {
    // Handle the error accordingly if the file is not found or there's another error
    return new Response(JSON.stringify({ error: 'Games data could not be loaded' }), { status: 500 });
  }
  
  const games = await gamesResponse.json();

  return new Response(JSON.stringify(games), { status: 200, headers: { "Content-Type": "application/json" } });
}
