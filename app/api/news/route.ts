import { NextResponse } from "next/server";
import axios from "axios";
import { parseString } from "xml2js";

interface Article {
	title: string;
	link: string;
	pubDate: string;
	source: string;
	sourceUrl: string;
	mediaContent: string | null;
}

export async function GET() {
	try {
		// Fetch the RSS feed from Yahoo Finance
		const response = await axios.get("https://finance.yahoo.com/news/rssindex");
		const xmlData = response.data;

		return new Promise((resolve, reject) => {
			parseString(xmlData, async (err, result) => {
				if (err) {
					console.error("Error parsing XML:", err);
					resolve(
						NextResponse.json(
							{ error: "Error parsing XML data" },
							{ status: 500 }
						)
					);
					return;
				}

				// Map over each item in the RSS feed and extract information
				const items = await Promise.all(
					result.rss.channel[0].item.map(
						async (item: any): Promise<Article> => {
							const articleData = {
								title: item.title[0],
								link: item.link[0],
								pubDate: item.pubDate[0],
								source: item.source[0]._,
								sourceUrl: item.source[0].$.url,
								mediaContent: item["media:content"]
									? item["media:content"][0].$.url
									: null,
							};

							return articleData;
						}
					)
				);

				resolve(NextResponse.json(items));
			});
		});
	} catch (error) {
		console.error("Error fetching RSS feed:", error);
		return NextResponse.json(
			{ error: "Error fetching RSS feed" },
			{ status: 500 }
		);
	}
}
