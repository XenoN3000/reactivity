import 'react'
import {Tab} from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos.tsx";
import {Profile} from "../../app/models/Profile.ts";
import ProfileAbout from "./ProfileAbout.tsx";


interface Props {
	profile: Profile;
}

export default function ({profile}: Props) {

	const panes = [
		{menuItem: 'About', render: () => <ProfileAbout profile={profile}/>},
		{menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
		{menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane>},
		{menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane>},
		{menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane>},
	]

	return (
		<Tab
			menu={{fluid: true, vertical: true}}
			menuPosition={"right"}
			panes={panes}
		/>
	)

}