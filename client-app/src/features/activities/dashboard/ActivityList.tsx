import "react"
import {Header} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem.tsx";
import {Fragment} from "react";


export default observer(function ActivityList() {

	const {activityStore} = useStore();
	const {groupedActivities} = activityStore;

	return (

		<Fragment>
			{groupedActivities.map(([group, activities]) => (
				<Fragment key={group}>
					<Header sub color={'teal'}>
						{group}
					</Header>

					{activities.map(activity => (
						<ActivityListItem key={activity.id} activity={activity}/>
					))}
				</Fragment>
			))}
		</Fragment>
	)
})