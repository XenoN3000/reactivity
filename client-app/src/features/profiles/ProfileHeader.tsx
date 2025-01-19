import 'react'
import {Divider, Grid, Header, Item, Segment, Statistic} from "semantic-ui-react";
import {Profile} from "../../app/models/Profile.ts";
import {observer} from "mobx-react-lite";
import { FollowButton } from './FollowButton.tsx';


interface Props {
	profile: Profile;
}


export default observer(function ({profile}: Props) {
	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image avatar={true} size={"small"} src={profile.image || '/assets/Images/user.png'}/>
							<Item.Content verticalAlign={'middle'}>
								<Header as={"h1"} content={profile.displayName}/>
							</Item.Content>

						</Item>
					</Item.Group>
				</Grid.Column>
				<Grid.Column width={4}>
					<Statistic.Group width={2}>
						<Statistic label={'Followers'} value={profile.followersCount}/>
						<Statistic label={'Following'} value={profile.followingCount}/>
					</Statistic.Group>

					<Divider/>
					<FollowButton profile={profile}/>
				</Grid.Column>
			</Grid>
		</Segment>
	)

})