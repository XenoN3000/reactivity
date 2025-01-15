import "react"
import {Profile} from "../../app/models/Profile.ts";
import {observer} from "mobx-react-lite";
import {Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface Props {
	profile: Profile
}

export default observer(function ProfileCard({profile}: Props) {
	function trunc(str: string | undefined) {
		if (str) return  str.length > 35 ? str.substring(0, 35) + "..." : str;
	}

	return (
		<Card as={Link} to={`/profiles/${profile.username}`}>
			<Image src={profile.image || "assets/Images/user.png"}/>
			<Card.Content>

				<Card.Header> {profile.displayName} </Card.Header>
				<Card.Description>{trunc(profile.bio)}</Card.Description>

			</Card.Content>
			<Card.Content extra>
				<Icon name={"user"}/>

				Some Followers !
			</Card.Content>
		</Card>
	)
})