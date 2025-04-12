"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Chip } from "@nextui-org/react";

interface MarketTime {
	status: string;
	message: string;
}

const MarketStatus = () => {
	const [marketInfo, setMarketInfo] = useState<MarketTime | null>(null);
	const [isMarketOpen, setIsMarketOpen] = useState<boolean | null>(null);

	useEffect(() => {
		const fetchMarketInfo = async () => {
			try {
				const res = await fetch("/api/market-time");
				const data: MarketTime = await res.json();
				setMarketInfo(data);
				setIsMarketOpen(data.status.toLowerCase() === "open");
			} catch (error) {
				console.error("Error fetching market info:", error);
			}
		};

		fetchMarketInfo();
	}, []);

	if (!marketInfo) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex items-center">
			{isMarketOpen !== null ? (
				<Chip color={isMarketOpen ? "success" : "danger"} variant="bordered">
					U.S. markets {isMarketOpen ? "open" : "closed"}
				</Chip>
			) : (
				<p>Loading market status...</p>
			)}
		</div>
	);
};

export default MarketStatus;
