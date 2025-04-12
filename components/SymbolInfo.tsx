"use client";
import { useEffect, useState } from "react";

interface SymbolInfo {
	companyName: string;
	symbol: string;
	market: string;
}

interface SymbolInfoProps {
	symbol: string;
}

const SymbolInfoComponent: React.FC<SymbolInfoProps> = ({ symbol }) => {
	const [info, setInfo] = useState<SymbolInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSymbolInfo = async () => {
			try {
				const response = await fetch(`/api/symbol/${symbol}/info`);
				const data = await response.json();
				setInfo(data);
			} catch (err) {
				setError("Failed to fetch symbol info");
			} finally {
				setLoading(false);
			}
		};

		fetchSymbolInfo();
	}, [symbol]);

	if (loading) return <p>Loading symbol info...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			{info && (
				<>
					<h2>Basic Info</h2>
					<p>Company Name: {info.companyName}</p>
					<p>Symbol: {info.symbol}</p>
					<p>Market: {info.market}</p>
				</>
			)}
		</div>
	);
};

export default SymbolInfoComponent;
