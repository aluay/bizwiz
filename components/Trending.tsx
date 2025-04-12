"use client";
import { useState, useEffect } from "react";
import DataList from "./DataList";
import Link from "next/link";

interface TrendingSymbol {
	name: string;
	symbol: string;
	price: number;
	priceChange: number;
	percentChange: number;
}

const TrendingSymbols = () => {
	const [TrendingSymbols, setTrendingSymbols] = useState<TrendingSymbol[]>([]);

	useEffect(() => {
		// Fetch the trending symbols data
		const fetchTrendingSymbols = async () => {
			const res = await fetch("/api/trending");
			const data: TrendingSymbol[] = await res.json();
			setTrendingSymbols(data);
		};
		fetchTrendingSymbols();
	}, []);

	const renderTrendingSymbols = (TrendingSymbol: TrendingSymbol) => (
		<>
			<div key={TrendingSymbol.symbol}>
				<div className="flex justify-between items-center text-xs">
					<div className="flex flex-col">
						<Link
							key={TrendingSymbol.symbol}
							href={`/symbol/${TrendingSymbol.symbol}`}>
							{TrendingSymbol.symbol}
						</Link>
						<span className="text-gray-500 truncate max-w-[150px]">
							{TrendingSymbol.name}
						</span>
					</div>
					<div className="flex flex-col text-right">
						<span>{TrendingSymbol.price.toFixed(2)}</span>
						<div
							className={`${TrendingSymbol.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
							{TrendingSymbol.priceChange > 0
								? `+${TrendingSymbol.priceChange.toFixed(2)}`
								: TrendingSymbol.priceChange.toFixed(2)}{" "}
							(
							{TrendingSymbol.percentChange > 0
								? `+${TrendingSymbol.percentChange.toFixed(2)}%`
								: `${TrendingSymbol.percentChange.toFixed(2)}%`}
							)
						</div>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<DataList
			data={TrendingSymbols}
			renderItem={renderTrendingSymbols}
			title="Trending"
		/>
	);
};

export default TrendingSymbols;
