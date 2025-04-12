import { FC, ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/react";

interface DataListProps<T> {
	data: T[];
	renderItem: (item: T) => ReactNode;
	title: string;
}

const DataList: FC<DataListProps<any>> = ({ data, renderItem, title }) => {
	return (
		<Card>
			<CardBody>
				<h2 className="mb-2">{title}</h2>
				<ul className="divide-y divide-dashed divide-neutral-400">
					{data.map((item, index) => (
						<li key={index} className="mb-1">
							{renderItem(item)}
						</li>
					))}
				</ul>
			</CardBody>
		</Card>
	);
};

export default DataList;
