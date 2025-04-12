"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRelativeTime } from "@/app/utils/relativeTime";
import { Button } from "@nextui-org/button";

interface Article {
	title: string;
	link: string;
	pubDate: string;
	source: string;
	sourceUrl: string;
	mediaContent: string;
}

const NewsPage = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const [showMoreSecondary, setShowMoreSecondary] = useState(false);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await fetch("/api/news");
				const data = await res.json();
				// Sort articles by publication date (newest first)
				const sortedArticles = data.sort(
					(a: Article, b: Article) =>
						new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
				);
				setArticles(sortedArticles);
			} catch (error) {
				console.error("Error fetching news articles:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) {
		return <div className="text-center py-10">Loading news articles...</div>;
	}

	const isLatestArticle = (pubDate: string) => {
		const now = new Date();
		const articleDate = new Date(pubDate);
		const diffInHours =
			(now.getTime() - articleDate.getTime()) / (1000 * 60 * 60);
		return diffInHours <= 10; // Articles less than 10 hours old
	};

	const hasImage = (article: Article) =>
		article.mediaContent !== null && article.mediaContent !== "";

	const mainArticle = articles.length > 0 ? articles[0] : null;

	const latestArticlesWithImages = articles
		.filter((article) => isLatestArticle(article.pubDate) && hasImage(article))
		.slice(1);

	// const moreNewsArticles = articles.filter(
	// 	(article) => isLatestArticle(article.pubDate) && !hasImage(article)
	// );

	// Control how many secondary articles are shown
	const secondaryArticles = articles.filter(
		(article) => !isLatestArticle(article.pubDate)
	);
	const articlesToShow = showMoreSecondary
		? secondaryArticles
		: secondaryArticles.slice(0, 14); // Show 5 articles by default

	return (
		<div className="container mx-auto">
			{/* Grid layout for main and secondary articles */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Main Article Section */}
				{mainArticle && (
					<div className="lg:col-span-2">
						<Link
							href={mainArticle.link}
							className="group hover:text-blue-500 transition-colors duration-200">
							<div
								className="relative h-80 bg-cover bg-center cursor-pointer rounded-lg"
								style={{
									backgroundImage: `url(${mainArticle.mediaContent})`,
								}}></div>
							<div>
								<p className="text-xl font-bold my-2">{mainArticle.title}</p>
								<p className="text-[10px] text-gray-500">
									{mainArticle.source} - {getRelativeTime(mainArticle.pubDate)}
								</p>
							</div>
						</Link>
					</div>
				)}

				{/* Latest News Column (Right Side) */}
				<div className="lg:px-4 lg:border-l">
					<h2 className="text-lg font-bold mb-2">Latest</h2>
					<ul className="space-y-4">
						{latestArticlesWithImages.slice(0, 5).map((article, index) => (
							<li key={index} className="border-b">
								<Link
									href={article.link}
									className="block text-xs font-bold hover:text-blue-500">
									{article.title}
								</Link>
								<p className="text-[10px] text-gray-500 pt-1 pb-2">
									{article.source} - {getRelativeTime(article.pubDate)}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* More News Column (Articles without images) */}
			{/* {moreNewsArticles.length > 0 && (
				<div className="mt-8">
					<h2 className="text-lg font-bold mb-4">More News</h2>
					<ul className="space-y-4">
						{moreNewsArticles.map((article, index) => (
							<li key={index} className="border-b border-gray-300 pb-2">
								<Link href={article.link}>
									<div className="block text-sm font-bold hover:underline truncate">
										{article.title}
									</div>
								</Link>
								<p className="text-xs text-gray-500">
									{article.source} - {getRelativeTime(article.pubDate)}
								</p>
							</li>
						))}
					</ul>
				</div>
			)} */}

			{/* Secondary Articles Grid */}
			<div className="container mx-auto mt-4">
				{/* <h2 className="text-lg font-bold mb-4">Secondary Articles</h2> */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{articlesToShow.map((article, index) => (
						<Link href={article.link} key={index}>
							<div className="flex flex-col md:flex-row group hover:text-blue-500 rounded-lg transition-colors duration-200">
								{article.mediaContent && (
									<div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
										<Image
											src={`/api/image-proxy?url=${encodeURIComponent(
												article.mediaContent
											)}`}
											alt={article.title}
											width={0}
											height={0}
											sizes="100vw"
											className="w-full h-auto w-full md:w-32 md:h-32 lg:w-40 lg:h-28 object-cover rounded-lg"
										/>
									</div>
								)}
								<div>
									<span className="text-[10px] text-gray-600">
										{article.source}
									</span>
									<i className="mx-1 text-[10px] text-gray-600">•</i>
									<span className="text-[10px] text-gray-600">
										{getRelativeTime(article.pubDate)}
									</span>
									<p className="text-sm font-bold">{article.title}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
				{secondaryArticles.length > 14 && (
					<div className="w-full flex justify-center mt-4">
						<Button
							className="w-full"
							onClick={() => setShowMoreSecondary(!showMoreSecondary)}>
							{showMoreSecondary ? "Less News..." : "More news..."}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewsPage;
