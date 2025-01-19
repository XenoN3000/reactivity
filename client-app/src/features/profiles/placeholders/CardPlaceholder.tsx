import "react";
import { Card, Placeholder } from "semantic-ui-react";

const CardPlaceholder = () => (
	<Card >
		<Placeholder>
			<Placeholder.Image square />
		</Placeholder>
		<Card.Content>
			<Placeholder>
				<Placeholder.Header>
					<Placeholder.Line />
					<Placeholder.Line />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Line />
					<Placeholder.Line />
				</Placeholder.Paragraph>
			</Placeholder>
		</Card.Content>
	</Card>
);

export default CardPlaceholder;
