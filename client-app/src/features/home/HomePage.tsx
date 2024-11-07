import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function HomePage() {
	return (
		<Segment inverted={true} textAlign='center' vertical={true} className={'masthead'}>
			<Container text={true}>
				<Header as={"h1"} inverted={true}>
					<Image size={"massive"} src={"/assets/Images/logo.png"} alt={"logo"}
					       style={{marginBottom: "12px"}}/>
					{"Reactivities"}
				</Header>
				<Header as={"h2"} inverted={true} content={"Welcome to Reactivities"}/>
				<Button as={Link} to={"/activities"} size={"huge"} inverted={true}>
					{"Take me to Activities !!! "}
				</Button>

			</Container>

		</Segment>
	)

}