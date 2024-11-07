import "react"
import {Header, Menu} from "semantic-ui-react";
import {Fragment} from "react";
import Calendar from "react-calendar";

export default function ActivityFilters() {
	return (

		<Fragment>
			<Menu vertical={true} size={"large"} style={{width: "100%", marginTop: 26}}>
				<Header icon={"filter"} attached={true} color={"teal"} content={"Filters"}/>
				<Menu.Item content={"All Activities"}/>
				<Menu.Item content={"I'm going"}/>
				<Menu.Item content={"I'm hosting"}/>
			</Menu>
			<Header/>
			<Calendar />
		</Fragment>
	);
}