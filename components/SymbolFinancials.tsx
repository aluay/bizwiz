"use client";
import { useEffect, useState } from "react";

interface Financials {
	revenue: string;
	marketCap: string;
	eps: string;
}

interface FinancialsProps {
	symbol: string;
}

const SymbolFinancialsComponent: React.FC<FinancialsProps> = ({ symbol }) => {
	const [financials, setFinancials] = useState<Financials | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFinancials = async () => {
			try {
				const response = await fetch(`/api/symbol/${symbol}/financials`);
				const data = await response.json();
				setFinancials(data);
			} catch (err) {
				setError("Failed to fetch financials");
			} finally {
				setLoading(false);
			}
		};

		fetchFinancials();
	}, [symbol]);

	if (loading) return <p>Loading financials...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			{financials && (
				<>
					<h2>Financials</h2>
					<p>Revenue: {financials.revenue}</p>
					<p>Market Cap: {financials.marketCap}</p>
					<p>EPS: {financials.eps}</p>
				</>
			)}
		</div>
	);
};

export default SymbolFinancialsComponent;
