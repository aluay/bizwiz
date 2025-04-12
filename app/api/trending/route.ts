import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
	try {
		// Fetch the data from the external API
		const response = await axios.get(
			`https://query1.finance.yahoo.com/v1/finance/trending/US?count=10&fields=logoUrl%2ClongName%2CshortName%2CregularMarketChange%2CregularMarketChangePercent%2CregularMarketPrice&format=true&useQuotes=true&quoteType=equity&lang=en-US&region=US`
		);
		const data = response.data;

		// Ensure 'quotes' exists and is an array
		if (data && Array.isArray(data.finance.result[0].quotes)) {
			// Filter to return only the desired fields where isYahooFinance is true
			const filteredTrendingSymbols = data.finance.result[0].quotes.map(
				(quote: any) => ({
					name: quote.longName,
					symbol: quote.symbol,
					price: quote.regularMarketPrice.raw,
					priceChange: quote.regularMarketChange.raw,
					percentChange: quote.regularMarketChangePercent.raw,
				})
			);

			return NextResponse.json(filteredTrendingSymbols);
		} else {
			return NextResponse.json([], { status: 200 }); // Return an empty array if 'quotes' is not found
		}
	} catch (error) {
		console.error("Error fetching trending symbols data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch trending symbols data" },
			{ status: 500 }
		);
	}
}
