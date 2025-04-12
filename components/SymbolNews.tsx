"use client";
import { useEffect, useState } from "react";

interface Article {
	link: string;
	title: string;
}

interface SymbolNewsProps {
	symbol: string;
}

const SymbolNewsComponent: React.FC<SymbolNewsProps> = ({ symbol }) => {
	const [news, setNews] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch(`/api/symbol/${symbol}/news`);
				let data = await response.json();

				if (!Array.isArray(data)) {
					data = [data];
				}

				setNews(data);
			} catch (err) {
				setError("Failed to fetch news");
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, [symbol]);

	if (loading) return <p>Loading news...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h2>Related News</h2>
			<ul>
				{news &&
					news.map((article, index) => (
						<li key={index}>
							<a href={article.link} target="_blank" rel="noopener noreferrer">
								{article.title}
							</a>
						</li>
					))}
			</ul>
		</div>
	);
};

export default SymbolNewsComponent;
