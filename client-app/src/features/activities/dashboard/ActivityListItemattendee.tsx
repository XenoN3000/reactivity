import "react";
import {observer} from "mobx-react-lite";
import {Image, List, Popup} from "semantic-ui-react";
import {Profile} from "../../../app/models/Profile.ts";
import ProfileCard from "../../profiles/ProfileCard.tsx";


interface Props {
	attendees: Profile[];
}


export default observer(function activityListItemAttendee({attendees}: Props) {
	return (
		<List horizontal={true}>
			{attendees.map((attendee) => (
				<Popup hoverable={true} key={attendee.username} trigger={
					<List.Item key={attendee.username}>
						<Image size={"mini"} circular={true} src={attendee.image || '/assets/Images/user.png'}/>
					</List.Item>
					}>

					<Popup.Content>
						<ProfileCard profile={attendee}/>
					</Popup.Content>
				</Popup>


			))}
		</List>
	)
})