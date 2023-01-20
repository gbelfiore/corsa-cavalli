import { useMemo } from "react";

const GridHorses = ({ ranking, horses }) => {
	const horsesDeck = [8, 18, 28, 38];

	const statistic = useMemo(() => {
		debugger;
		let winsNum = window.localStorage.getItem("winsNum");
		let game = window.localStorage.getItem("game") ?? 0;
		if (winsNum) {
			winsNum = JSON.parse(winsNum);
		} else {
			winsNum = [0, 0, 0, 0];
		}
		return { winsNum, game };
	}, []);

	return (
		<div className="grid">
			<div className="row">
				{[...Array(10).keys()].map((p) => (
					<div className="cell cellHeader" style={p === 0 ? { borderRight: "3px solid gold" } : {}}>
						{p + 1}
					</div>
				))}
			</div>
			{[0, 1, 2, 3].map((c) => {
				const position = ranking.findIndex((p) => p === c);
				const colorBadge = position === 0 ? "gold" : position === 1 ? "#c0c0c0" : position === 2 ? "#CD7F32" : "#817a68";
				return (
					<div className="row">
						{[...Array(10).keys()].map((p) => {
							const styleCarta = {};
							if (horses[c] === p) {
								styleCarta.backgroundImage = `url("/carte/${horsesDeck[c]}.jpg")`;
							}
							if (p === 0) styleCarta.borderRight = "3px solid gold";
							if (p === 8) styleCarta.borderRight = "3px solid red";

							return (
								<div className="cell cellHeight" style={styleCarta}>
									{horses[c] === 0 && p === 0 && (
										<div className="badge2" style={{ backgroundColor: "#000" }}>
											{`${statistic.winsNum[c]}/${statistic.game}`}
										</div>
									)}
									{horses[c] === 9 && p === 9 && (
										<div className="badge" style={{ backgroundColor: colorBadge }}>
											{position + 1}
										</div>
									)}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default GridHorses;
