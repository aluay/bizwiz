"use client";
import { useState, useEffect } from "react";
import DataList from "./DataList";
import Link from "next/link";

interface Loser {
	name: string;
	symbol: string;
	price: number;
	priceChange: number;
	percentChange: number;
}

const TopLosers = () => {
	const [losers, setLosers] = useState<Loser[]>([]);

	useEffect(() => {
		// Fetch the top losers data
		const fetchLosers = async () => {
			const res = await fetch("/api/losers");
			const data: Loser[] = await res.json();
			setLosers(data);
		};
		fetchLosers();
	}, []);

	const renderLoser = (loser: Loser) => (
		<>
			<div key={loser.symbol}>
				<div className="flex justify-between items-center text-xs">
					<div className="flex flex-col">
						<Link key={loser.symbol} href={`/symbol/${loser.symbol}`}>
							{loser.symbol}
						</Link>
						<span className="text-gray-500 truncate max-w-[150px]">
							{loser.name}
						</span>
					</div>
					<div className="flex flex-col text-right">
						<span>{loser.price.toFixed(2)}</span>
						<span className=" text-red-500">
							{loser.priceChange.toFixed(2)}&nbsp;(
							{loser.percentChange.toFixed(2)}%)
						</span>
					</div>
				</div>
			</div>
		</>
	);

	return <DataList data={losers} renderItem={renderLoser} title="Top Losers" />;
};

export default TopLosers;
