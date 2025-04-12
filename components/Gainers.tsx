"use client";
import { useState, useEffect } from "react";
import DataList from "./DataList";
import Link from "next/link";

interface Gainer {
	name: string;
	symbol: string;
	price: number;
	priceChange: number;
	percentChange: number;
}

const TopGainers = () => {
	const [gainers, setGainers] = useState<Gainer[]>([]);

	useEffect(() => {
		// Fetch the top gainers data
		const fetchGainers = async () => {
			const res = await fetch("/api/gainers");
			const data: Gainer[] = await res.json();
			setGainers(data);
		};
		fetchGainers();
	}, []);

	const renderGainer = (gainer: Gainer) => (
		<>
			<div key={gainer.symbol}>
				<div className="flex justify-between items-center text-xs">
					<div className="flex flex-col">
						<Link key={gainer.symbol} href={`/symbol/${gainer.symbol}`}>
							{gainer.symbol}
						</Link>
						<span className="text-gray-500 truncate max-w-[150px]">
							{gainer.name}
						</span>
					</div>
					<div className="flex flex-col text-right">
						<span>{gainer.price.toFixed(2)}</span>
						<span className=" text-green-500">
							+{gainer.priceChange.toFixed(2)}&nbsp;(+
							{gainer.percentChange.toFixed(2)}%)
						</span>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<DataList data={gainers} renderItem={renderGainer} title="Top Gainers" />
	);
};

export default TopGainers;
