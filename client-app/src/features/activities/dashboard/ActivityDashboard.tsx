import 'react'
import {Grid, Loader} from "semantic-ui-react";
import ActivityList from "./ActivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Fragment, useEffect, useState} from "react";
import ActivityFilters from "./ActivityFilters.tsx";
import {PagingParams} from "../../../app/models/pagination.ts";
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListPlaceholder from "./ActivityListPlaceholder.tsx";


export default observer(function ActivityDashboard() {

	const {activityStore} = useStore();
	const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
	const [loadingNext, setLoadingNext] = useState(false);

	function handleGetNext() {
		setLoadingNext(true);
		setPagingParams(new PagingParams(pagination!.currentPage + 1));
		loadActivities().then(() => setLoadingNext(false));
	}


	useEffect(() => {

		if (activityRegistry.size <= 1) loadActivities().then();
	}, [loadActivities, activityRegistry])


	// if (activityStore.loadingInitial && !loadingNext) return <LoadingComponent content={"Loading Activities..."}/>


	return (
		<Grid>
			<Grid.Column width={10}>
				{activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
					<Fragment>
						<ActivityListPlaceholder/>
						<ActivityListPlaceholder/>
					</Fragment>
				) : (
					<InfiniteScroll pageStart={0} loadMore={handleGetNext}
					                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
						<ActivityList/>
					</InfiniteScroll>
				)}

			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityFilters/>
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loadingNext}/>
			</Grid.Column>
		</Grid>
	)
})

