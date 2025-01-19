import 'react'
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos.tsx";
import { Profile } from "../../app/models/Profile.ts";
import ProfileAbout from "./ProfileAbout.tsx";
import ProfileFollowings from './ProfileFollowings.tsx';
import { useStore } from '../../app/stores/store.ts';
import ProfileActivities from "./ProfileActivities.tsx";


interface Props {
	profile: Profile;
}

export default function ({ profile }: Props) {
	const {profileStore} = useStore();	

	const panes = [
		{ menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
		{ menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
		{ menuItem: 'Events', render: () => <ProfileActivities/> },
		{ menuItem: 'Followers', render: () => <ProfileFollowings /> },
		{ menuItem: 'Following', render: () => <ProfileFollowings /> },
	]

	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition={"right"}
			panes={panes}
			onTabChange={(_, data) => profileStore.setActiveTab(data.activeIndex as number)}
		/>
	)

}