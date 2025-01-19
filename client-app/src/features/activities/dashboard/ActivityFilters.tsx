import "react"
import {Header, Menu} from "semantic-ui-react";
import {Fragment} from "react";
import Calendar from "react-calendar";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store.ts";

export function ActivityFilters() {

	const {activityStore:{predicate, setPredicate}} = useStore();

	return (

		<Fragment>
			<Menu vertical={true} size={"large"} style={{width: "100%", marginTop: 26}}>
				<Header icon={"filter"} attached={true} color={"teal"} content={"Filters"}/>
				<Menu.Item content={"All Activities"} active={predicate.has('all')} onClick={() => setPredicate('all', 'true' )}/>
				<Menu.Item content={"I'm going"}  active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true' )}/>
				<Menu.Item content={"I'm hosting"}  active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true' )}/>
			</Menu>
			<Header/>
			<Calendar onChange={(date) => setPredicate('startDate', date as Date)} value={predicate.get('startDate') || new Date()} />
		</Fragment>
	);
}

export default observer(ActivityFilters);