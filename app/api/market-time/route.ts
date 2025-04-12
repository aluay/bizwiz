import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
	try {
		// Fetch market time information from the external API
		const response = await axios.get(
			"https://finance.yahoo.com/_finance_doubledown/api/resource/finance.market-time",
			{
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
				},
			}
		);
		const data = response.data;

		const marketInfo = {
			status: data.status,
			message: data.message,
		};

		return NextResponse.json(marketInfo);
	} catch (error) {
		console.error("Error fetching market time data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch market time data" },
			{ status: 500 }
		);
	}
}
