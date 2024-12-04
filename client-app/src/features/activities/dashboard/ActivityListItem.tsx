import "react"
import {Button, Icon, Item, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import {format} from "date-fns";

interface Props {
	activity: Activity,
}

  export default function ActivityListItem({activity}: Props) {

	return (

		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size={'tiny'} circular={true} src={'/assets/Images/user.png'}/>
						<Item.Content>
							<Item.Header as={Link} to={`/activities/${activity.id}`}>
								{activity.title}
							</Item.Header>
							<Item.Description>
								{"Hoseted by Hosein"}
							</Item.Description>
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
				Attendees go Destination
			</Segment>
			<Segment clearing={true}>
				<span>{activity.description}</span>
				<Button as={Link} to={`/activities/${activity.id}`} color={'teal'} floated={'right'} content={'View'}/>
			</Segment>
		</Segment.Group>

	)
}