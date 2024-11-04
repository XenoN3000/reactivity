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
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";


export default observer(function ActivityDetails() {

	const {activityStore} = useStore();
	const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
	const {id} = useParams();
	useEffect(() => {
		if (id) loadActivity(id);
	},[id, loadActivity])

	if (loadingInitial || !activity) return <LoadingComponent/>;

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
					<Button as={Link}  to={`/manage/${activity.id}`} basic color={'blue'} content={'Edit'}/>
					<Button as={Link}  to={'/activities'} basic color={'grey'} content={'Cancel'}/>
				</Button.Group>
			</Card.Content>
		</Card>
	)
})