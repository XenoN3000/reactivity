import "react"
import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import {format} from "date-fns";
import ActivityListItemattendee from "./ActivityListItemattendee.tsx";

interface Props {
	activity: Activity,
}

export default function ActivityListItem({activity}: Props) {
	function trunc(str: string | undefined) {
		if (str) return str.length > 70 ? str.substring(0, 70) + "..." : str;
	}

	return (

		<Segment.Group>
			<Segment>
				{activity.isCancelled &&
					<Label attached={"top"} color={"red"} content={"Cancelled"} style={{textAlign: 'center'}}/>
				}
				<Item.Group>
					<Item>
						<Item.Image style={{marginBottom: 5}} size={'tiny'} circular={true} src={activity.host?.image || '/assets/Images/user.png'}/>
						<Item.Content>
							<Item.Header as={Link} to={`/activities/${activity.id}`}>
								{activity.title}
							</Item.Header>
							<Item.Description>{"Hoseted by "} <Link
								to={`/profiles/${activity.hostUsername}`}> {activity.host?.displayName}</Link></Item.Description>
							{activity.isHost && (
								<Item.Description>
									<Label basic color={'orange'}>
										{"You are hosting this activity !"}
									</Label>
								</Item.Description>
							)}
							{activity.isGoing && !activity.isHost && (
								<Item.Description>
									<Label basic color={'green'}>
										{"You are going to this activity !"}
									</Label>
								</Item.Description>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name={'clock'}/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
					<Icon name={'marker'}/> {activity.venue}
				</span>
			</Segment>
			<Segment secondary>
				<ActivityListItemattendee attendees={activity.attendees!}/>
			</Segment>
			<Segment clearing={true}>
				<span>{trunc(activity.description)}</span>
				<Button as={Link} to={`/activities/${activity.id}`} color={'teal'} floated={'right'} content={'View'}/>
			</Segment>
		</Segment.Group>

	)
}
