import "./App.css";
import { useCallback, useEffect, useState } from "react";
import GridHorses from "./GridHorses";
import { shuffleDeck } from "./ShuffleUtility";

const deckDefault = [
	0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39,
];

function WinsNum() {
	const [deck, setDeck] = useState(shuffleDeck(deckDefault));
	const [lastCards, setLastCards] = useState([]);
	const [horses, setHorses] = useState([0, 0, 0, 0]);
	const [ranking, setRanking] = useState([]);

	const shuffleCards = useCallback(() => {
		if (deck.length === 0) return;
		const indexCard = Math.floor(Math.random() * deck.length);
		const card = deck[indexCard];
		const deckUpdate = [...deck];
		const rankingUpdate = [...ranking];
		deckUpdate.splice(indexCard, 1);
		setDeck(deckUpdate);
		const updateHorses = [...horses];
		if (card >= 0 && card <= 9) {
			updateHorses[0]++;
			if (updateHorses[0] === 9) rankingUpdate.push(0);
		} else if (card >= 10 && card <= 19) {
			updateHorses[1]++;
			if (updateHorses[1] === 9) rankingUpdate.push(1);
		} else if (card >= 20 && card <= 29) {
			updateHorses[2]++;
			if (updateHorses[2] === 9) rankingUpdate.push(2);
		} else if (card >= 30 && card <= 39) {
			updateHorses[3]++;
			if (updateHorses[3] === 9) rankingUpdate.push(3);
		}
		let lastCardUpdate = [...lastCards];
		lastCardUpdate.push(card);

		setLastCards(lastCardUpdate);
		setHorses(updateHorses);
		setRanking(rankingUpdate);
	}, [ranking, horses, lastCards, deck]);

	useEffect(() => {
		if (JSON.stringify(horses) === JSON.stringify([9, 9, 9, 9])) {
			let game = window.localStorage.getItem("game") ?? 0;
			let winsNum = window.localStorage.getItem("winsNum");
			if (winsNum) {
				winsNum = JSON.parse(winsNum);
			} else {
				winsNum = [0, 0, 0, 0];
			}
			winsNum[ranking[0]]++;
			window.localStorage.setItem("winsNum", JSON.stringify(winsNum));
			window.localStorage.setItem("game", parseInt(game) + 1);
		}
	}, [horses, ranking]);

	const renderDorso = useCallback(() => {
		const numViewLastCard = 23;
		const viewLastCard = [...lastCards].reverse().slice(0, numViewLastCard);
		return (
			<div className="console">
				<div className="tiro">
					<img className="tiroDorso" src={`/carte/dorso.jpg`} alt="dorso" onClick={() => shuffleCards()} />
				</div>
				<div className="lastExitCards">
					{viewLastCard[0] >= 0 && <img className="lastCardExit" src={`/carte/${viewLastCard[0]}.jpg`} alt="carta estratta" />}
				</div>
				<div className="lastCards">
					{viewLastCard.slice(1, numViewLastCard).map((l) => (
						<img className="lastCard" src={`/carte/${l}.jpg`} alt="dorso" />
					))}
				</div>
			</div>
		);
	}, [lastCards, shuffleCards]);

	return (
		<div className="App">
			{<GridHorses ranking={ranking} horses={horses} />}
			{renderDorso()}
		</div>
	);
}

export default WinsNum;
