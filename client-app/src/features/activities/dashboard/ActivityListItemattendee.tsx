import "react";
import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile.ts";
import ProfileCard from "../../profiles/ProfileCard.tsx";
import { Link } from "react-router-dom";


interface Props {
	attendees: Profile[];
}


export default observer(function activityListItemAttendee({ attendees }: Props) {
	const styles = {
		borderColor: 'orange',
		borderWidth: 2
	}

	return (
		<List horizontal={true}>
			{attendees.map((attendee) => (
				<Popup hoverable={true} key={attendee.username} trigger={
					<List.Item as={Link} to={`/profiles/${attendee.username}`} key={attendee.username}>
						<Image style={attendee.following ? styles : null} bordered size={"mini"} circular={true} src={attendee.image || '/assets/Images/user.png'} />
					</List.Item>
				}>

					<Popup.Content>
						<ProfileCard profile={attendee} />
					</Popup.Content>
				</Popup>


			))}
		</List>
	)
})