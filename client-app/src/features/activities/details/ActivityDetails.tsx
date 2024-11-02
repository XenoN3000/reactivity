import 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    // CardContent,
    Card,
    Image, Button,
} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store.ts";




export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm,cancelSelectedActivity} = activityStore

    if (!activity) return ;

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