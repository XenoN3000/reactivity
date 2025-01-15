import 'react'
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {useState} from "react";
import {Button, Grid, Header, Tab} from "semantic-ui-react";
import {ProfileEditForm} from "./form/ProfileEditForm.tsx";
import {Profile} from "../../app/models/Profile.ts";

interface Props {
	profile: Profile;
}

export default observer(function ProfileAbout({profile} : Props) {
	const {profileStore: {isCurrentUser}} = useStore()
	const [editMode, setEditMode] = useState(false)


	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated={"left"} icon={"user"} content={`About ${profile?.displayName}`}/>
					{isCurrentUser && (
						<Button basic floated={"right"} content={editMode ? "Cancel" : "Edit Profile"} onClick={() => setEditMode(!editMode)}/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? <ProfileEditForm setEditMode={setEditMode}/> : <span style={{whiteSpace: "pre-wrap"}}>{profile?.bio}</span>}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	)
})