import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
	request: Request,
	{ params }: { params: { symbol: string } }
) {
	const { symbol } = params;
	const userAgent = {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
		},
	};

	try {
		const response = await axios.get(
			`https://api.nasdaq.com/api/company/${symbol}/financials`,
			userAgent
		);

		return NextResponse.json({
			response,
		});
	} catch (error) {
		console.error("Error fetching stock financials:", error);
		return NextResponse.json(
			{ error: "Failed to fetch stock financials" },
			{ status: 500 }
		);
	}
}
