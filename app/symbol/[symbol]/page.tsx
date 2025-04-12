import React from "react";
import SymbolInfoComponent from "@/components/SymbolInfo";
import SymbolFinancialsComponent from "@/components/SymbolFinancials";
import SymbolNewsComponent from "@/components/SymbolNews";

interface SymbolPageProps {
	symbol: string;
}

const SymbolPage: React.FC<SymbolPageProps> = ({ symbol }) => {
	return (
		<div>
			<h1>Stock Information for {symbol}</h1>
			{/* <SymbolInfoComponent symbol={symbol} /> */}
			{/* <SymbolFinancialsComponent symbol={symbol} /> */}
			<SymbolNewsComponent symbol={symbol} />
		</div>
	);
};

export default SymbolPage;
