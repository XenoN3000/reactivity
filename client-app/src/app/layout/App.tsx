import {Fragment, useEffect} from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar.tsx";
import {observer} from "mobx-react-lite";
import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage.tsx";
import {ToastContainer} from "react-toastify";
import {useStore} from "../stores/store.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import ModalContainer from "../common/modals/ModalContainer.tsx";


function App() {
	const location = useLocation();
	const {commonStore, userStore} = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => {
				commonStore.setAppLoaded()
			});
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded) return <LoadingComponent content={"Loading application..."}/>;

	return (

		<Fragment>
			<ScrollRestoration/>
			<ModalContainer/>
			<ToastContainer position={"bottom-right"} hideProgressBar={true} theme={"colored"}/>
			{location.pathname === "/" ? <HomePage/> : (
				<Fragment>
					<NavBar/>
					<Container style={{marginTop: '7em'}}>
						<Outlet/>
					</Container>
				</Fragment>
			)}
		</Fragment>
	)
}

export default observer(App);
