"use client";
import { useState, useEffect } from "react";
import DataList from "./DataList";
import Link from "next/link";

interface MostActiveSymbol {
	name: string;
	symbol: string;
	price: number;
	priceChange: number;
	percentChange: number;
}

const MostActiveSymbols = () => {
	const [MostActiveSymbols, setMostActiveSymbols] = useState<
		MostActiveSymbol[]
	>([]);

	useEffect(() => {
		// Fetch the most active symbols data
		const fetchMostActiveSymbols = async () => {
			const res = await fetch("/api/most-active");
			const data: MostActiveSymbol[] = await res.json();
			setMostActiveSymbols(data);
		};
		fetchMostActiveSymbols();
	}, []);

	const renderMostActiveSymbols = (mostActiveSymbol: MostActiveSymbol) => (
		<>
			<div key={mostActiveSymbol.symbol}>
				<div className="flex justify-between items-center text-xs">
					<div className="flex flex-col">
						<Link
							key={mostActiveSymbol.symbol}
							href={`/symbol/${mostActiveSymbol.symbol}`}>
							{mostActiveSymbol.symbol}
						</Link>
						<span className="text-gray-500 truncate max-w-[150px]">
							{mostActiveSymbol.name}
						</span>
					</div>
					<div className="flex flex-col text-right">
						<span>{mostActiveSymbol.price.toFixed(2)}</span>
						<div
							className={`${mostActiveSymbol.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
							{mostActiveSymbol.priceChange > 0
								? `+${mostActiveSymbol.priceChange.toFixed(2)}`
								: mostActiveSymbol.priceChange.toFixed(2)}{" "}
							(
							{mostActiveSymbol.percentChange > 0
								? `+${mostActiveSymbol.percentChange.toFixed(2)}%`
								: `${mostActiveSymbol.percentChange.toFixed(2)}%`}
							)
						</div>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<DataList
			data={MostActiveSymbols}
			renderItem={renderMostActiveSymbols}
			title="Most Active"
		/>
	);
};

export default MostActiveSymbols;
