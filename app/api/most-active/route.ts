import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
	try {
		// Fetch the data from the external API
		const response = await axios.get(
			`https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=most_actives&count=10&corsDomain=finance.yahoo.com`
		);
		const data = response.data;

		// Ensure 'quotes' exists and is an array
		if (data && Array.isArray(data.finance.result[0].quotes)) {
			// Filter to return only the desired fields where isYahooFinance is true
			const filteredMostActiveSymbols = data.finance.result[0].quotes.map(
				(quote: any) => ({
					name: quote.longName,
					symbol: quote.symbol,
					price: quote.regularMarketPrice,
					priceChange: quote.regularMarketChange,
					percentChange: quote.regularMarketChangePercent,
				})
			);

			return NextResponse.json(filteredMostActiveSymbols);
		} else {
			return NextResponse.json([], { status: 200 }); // Return an empty array if 'quotes' is not found
		}
	} catch (error) {
		console.error("Error fetching most active symbols data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch most active symbols data" },
			{ status: 500 }
		);
	}
}
