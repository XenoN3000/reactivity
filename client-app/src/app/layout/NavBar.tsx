import "react";
import {Button, Container, Dropdown, Image, Menu} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

export default observer(function NavBar() {
	const {userStore: {user, logout}} = useStore();
	return (
		<Menu inverted fixed={"top"}>
			<Container>
				<Menu.Item as={NavLink} to={'/'} header>
					<img src="/assets/Images/logo.png" alt={"logo"} style={{marginRight: "10px"}}/>
					Reactivity
				</Menu.Item>
				<Menu.Item as={NavLink} to={'/activities'} name={"Activities"}/>
				<Menu.Item as={NavLink} to={'/errors'} name={"Errors"}/>
				<Menu.Item>
					<Button as={NavLink} to={'/createActivity'} positive content={"Create Activiy"}/>
				</Menu.Item>
				<Menu.Item position={'right'}>
					<Image src={user?.image || '/assets/Images/user.png'} avatar={true} spaced={"right"}/>
					<Dropdown pointing={"top left"} text={user?.displayName}>
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text={"My Profile"} icon={"user"}/>
							<Dropdown.Item onClick={logout} text={"Logout"} icon={"power"}/>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Container>

		</Menu>
	)
});
