import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useStore} from "../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Fragment} from "react";
import LoginForm from "../users/LoginForm.tsx";
import RegisterForm from "../users/RegisterForm.tsx";

export default observer(function HomePage() {
	const {userStore, modalStore} = useStore();
	return (
		<Segment inverted={true} textAlign='center' vertical={true} className={'masthead'}>
			<Container text={true}>
				<Header as={"h1"} inverted={true}>
					<Image size={"massive"} src={"/assets/Images/logo.png"} alt={"logo"}
					       style={{marginBottom: "12px"}}/>
					{"Reactivities"}
				</Header>
				{userStore.isLoggedIn ? (
					<Fragment>
						<Header as={"h2"} inverted={true} content={"Welcome to Reactivities"}/>
						<Button as={Link} to={"/activities"} size={"huge"} inverted={true}>
							{"Go to Activities!"}
						</Button>
					</Fragment>
				) : (

					<Fragment>
						<Button onClick={() => modalStore.openModal(<LoginForm/>)} size={"huge"} inverted={true}>
							{"Login!"}
						</Button>

						<Button onClick={() => modalStore.openModal(<RegisterForm/>)} size={"huge"} inverted={true}>
							{"Register!"}
						</Button>

					</Fragment>

				)}


			</Container>

		</Segment>
	)

})