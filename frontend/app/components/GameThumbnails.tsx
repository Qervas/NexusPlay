// components/GameThumbnail.tsx

import {Game} from '../config/types';
import Image from 'next/image'; // Replace 'library-name' with the actual library name

const GameThumbnail = ({ game }: { game: Game }) => {
		return (
			<div className="game-thumbnail">
				<Image src={game.thumbnailUrl} width={300} height={200} alt={game.title} />
				<div className="game-info">
					<h3>{game.title}</h3>
					<p>{game.description}</p>
					{/* More info and interaction buttons can go here */}
				</div>
			</div>
		);
};

 
export default GameThumbnail;