import { NextRequest, NextResponse } from "next/server";

// This is a common issue when dealing with external image sources in Next.js. Since we can't predict all possible hostnames for the images, we need a different approach.
// We use a proxy route for images
// This route fetches the images from the external sources and servers them through our own domain
export async function GET(request: NextRequest) {
	const url = request.nextUrl.searchParams.get("url");

	if (!url) {
		return new NextResponse("Missing URL parameter", { status: 400 });
	}

	try {
		const imageResponse = await fetch(url);
		const imageBuffer = await imageResponse.arrayBuffer();
		const headers = new Headers(imageResponse.headers);
		headers.set(
			"Content-Type",
			imageResponse.headers.get("Content-Type") || "image/jpeg"
		);

		return new NextResponse(imageBuffer, {
			headers,
			status: imageResponse.status,
		});
	} catch (error) {
		console.error("Error proxying image:", error);
		return new NextResponse("Error fetching image", { status: 500 });
	}
}
