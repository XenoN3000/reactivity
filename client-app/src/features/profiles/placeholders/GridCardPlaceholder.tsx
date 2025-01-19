import "react";
import CardPlaceholder from "./CardPlaceholder";

interface Props {
	itemCount: number;
}

const CardGridPlaceholder = ({itemCount} : Props) => (
	<>
		{[...Array(itemCount)].map((_, i) => (
			<CardPlaceholder key={i}/>
		))}
	</>
);

export default CardGridPlaceholder;
