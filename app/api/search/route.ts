import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol");

	if (!symbol) {
		return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
	}

	try {
		// Fetch the data from the external API
		const response = await axios.get(
			`https://query2.finance.yahoo.com/v1/finance/search?q=${symbol}&lang=en-US&region=US&quotesCount=6&newsCount=0&listsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`
		);
		const data = response.data;

		// Ensure 'quotes' exists and is an array
		if (data && Array.isArray(data.quotes)) {
			// Filter to return only the desired fields where isYahooFinance is true
			const filteredSearch = data.quotes
				.filter((quote: any) => quote.isYahooFinance === true) // Filter out unwanted results
				.map((quote: any) => ({
					name: quote.longname,
					symbol: quote.symbol,
					exchange: quote.exchange,
					type: quote.quoteType,
				}));

			return NextResponse.json(filteredSearch);
		} else {
			return NextResponse.json([], { status: 200 }); // Return an empty array if 'quotes' is not found
		}
	} catch (error) {
		console.error("Error fetching symbol data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
