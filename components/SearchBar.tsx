"use client";
import React, { useState, useEffect } from "react";
import { SearchIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Input,
} from "@nextui-org/react";
import Link from "next/link";

interface SearchResult {
	name: string;
	symbol: string;
	exchange: string;
	type: string;
}

const SearchBar = () => {
	const [query, setQuery] = useState(""); // State for the input query
	const [results, setResults] = useState<SearchResult[]>([]); // State for the search results
	const [debouncedQuery, setDebouncedQuery] = useState(query); // State to handle debounced query
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const router = useRouter();

	// Debounce input changes
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300); // 300ms delay for debouncing

		// Cleanup timeout if query changes before the delay is up
		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	// Effect to fetch data whenever debouncedQuery changes
	useEffect(() => {
		const fetchData = async () => {
			if (debouncedQuery.length > 0) {
				try {
					const res = await fetch(`/api/search?symbol=${debouncedQuery}`);
					const data: SearchResult[] = await res.json();

					// Ensure `data` is always an array
					if (Array.isArray(data)) {
						setResults(data);
					} else {
						setResults([]); // Set an empty array if the data is not in the expected format
					}
				} catch (error) {
					console.error("Error fetching search results:", error);
					setResults([]); // Set results to an empty array on error
				}
			} else {
				setResults([]); // Clear results if input is empty
			}
		};

		fetchData();
	}, [debouncedQuery]);

	const handleSymbolClick = (symbol: string) => {
		router.push(`/symbol/${symbol}`); // Redirect to the symbol page
	};

	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				startContent={
					<SearchIcon className="pointer-events-none flex-shrink-0" />
				}
				className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20">
				Search...
			</Button>
			<Modal
				size="2xl"
				hideCloseButton={true}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				scrollBehavior={"inside"}
				classNames={{
					backdrop: "bg-[#000]/80 backdrop-opacity-100",
				}}>
				<ModalContent className="h-80">
					<>
						<ModalHeader>
							<Input
								autoFocus
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								aria-label="Search"
								labelPlacement="outside"
								placeholder="Search symbol or company name..."
								startContent={
									<SearchIcon className="pointer-events-none flex-shrink-0" />
								}
								type="search"
								className="py-2"
							/>
						</ModalHeader>
						<ModalBody>
							{results.length > 0 ? (
								<ul>
									{results.map((result) => (
										<li key={result.symbol}>
											<Link
												key={result.symbol}
												href={`/symbol/${result.symbol}`}
												onClick={() => handleSymbolClick(result.symbol)}
												className="grid grid-cols-4 gap-4 items-center border-b border-gray-700 py-1 hover:text-blue-500">
												<p className="text-left truncate">{result.symbol}</p>
												<p className="text-left truncate">{result.name}</p>
												<p className="text-left truncate">{result.exchange}</p>
												<p className="text-left truncate">{result.type}</p>
											</Link>
										</li>
									))}
								</ul>
							) : (
								<div className="flex flex-col text-center items-center justify-center h-32">
									<p className="text-default-400">No recent searches</p>
								</div>
							)}
						</ModalBody>
					</>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SearchBar;
