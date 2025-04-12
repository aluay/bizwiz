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
		const basicInfoResponse = await axios.get(
			`https://api.nasdaq.com/api/quote/${symbol}/info?assetclass=stocks`,
			userAgent
		);
		const summaryResponse = await axios.get(
			`https://api.nasdaq.com/api/quote/${symbol}/summary?assetclass=stocks`,
			userAgent
		);

		const basicInfo = basicInfoResponse.data;
		const summary = summaryResponse.data;

		return NextResponse.json({
			basicInfo,
			summary,
		});
	} catch (error) {
		console.error("Error fetching stock info:", error);
		return NextResponse.json(
			{ error: "Failed to fetch stock info" },
			{ status: 500 }
		);
	}
}
