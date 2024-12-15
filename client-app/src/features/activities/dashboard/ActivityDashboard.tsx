import 'react'
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import ActivityFilters from "./ActivityFilters.tsx";


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {

       if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry])


    if (activityStore.loadingInitial) return <LoadingComponent content={"Loading Activities..."}/>



    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
})

