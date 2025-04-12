// import { title } from "@/components/primitives";
// import SearchBar from "../components/SearchBar";
import Gainers from "../components/Gainers";
import Losers from "../components/Losers";
import MostActiveSymbols from "@/components/MostActive";
import News from "@/components/News";
import TrendingSymbols from "@/components/Trending";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center">
			<div className="flex flex-col text-center w-full">
				{/* <div className="uppercase tracking-wide text-sm font-semibold mt-4">
					<h1 className={title()}>Search&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>BizWiz&nbsp;</h1>
					<h1 className={title()}>for stocks and companies</h1>
				</div> */}
				{/* <SearchBar /> */}
			</div>

			<div className="flex justify-between flex-col md:flex-row mt-4 gap-2 w-full">
				<div className="py-8 flex-grow">
					<News />
				</div>
				<div className="flex flex-col py-8 gap-2">
					<Gainers />
					<Losers />
					<MostActiveSymbols />
					<TrendingSymbols />
				</div>
			</div>
		</section>
	);
}
