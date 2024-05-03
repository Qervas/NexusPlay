// config/types.ts
export type Game = {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	playUrl: string;
};
  
export type HomePageProps = {
	games: Game[];
};
