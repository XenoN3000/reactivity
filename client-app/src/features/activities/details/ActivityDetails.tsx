import 'react'
import {Activity} from "../../../app/models/activity.ts";
import {
    CardMeta,
    CardHeader,
    CardDescription,
    // CardContent,
    Card,
    Image, Button,
} from 'semantic-ui-react'

interface Props {
    activity: Activity
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
}


export default function ActivityDetails({activity, cancelSelectedActivity, openForm}: Props) {
    return (
        <Card fluid={true}>
            <Image src={`/assets/Images/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={'2'}>
                    <Button onClick={() => openForm(activity.id)} basic color={'blue'} content={'Edit'}/>
                    <Button onClick={() => cancelSelectedActivity()} basic color={'grey'} content={'Cancel'}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}