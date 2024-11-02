import 'react'
import {ChangeEvent} from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";


export default observer( function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity,closeForm,createActivity,updateActivity,loading} =activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState<Activity>(initialState);


    function handleSubmit() {
        activity.id?  updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing={true}>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder={'Title'} value={activity.title} name={'title'} onChange={handleInputChange}/>
                <Form.TextArea placeholder={'Description'} value={activity.description} name={'description'}
                               onChange={handleInputChange}/>
                <Form.Input placeholder={'Category'} value={activity.category} name={'category'}
                            onChange={handleInputChange}/>
                <Form.Input type="date" placeholder={'Date'} value={activity.date} name={'date'}
                            onChange={handleInputChange}/>
                <Form.Input placeholder={'City'} value={activity.city} name={'city'} onChange={handleInputChange}/>
                <Form.Input placeholder={'Venue'} value={activity.venue} name={'venue'} onChange={handleInputChange}/>
                <Button loading={loading} floated={"right"} positive={true} type="submit" content={'Submit'}/>
                <Button onClick={closeForm} floated={"right"} type="button" content={'Cancel'}/>

            </Form>
        </Segment>
    )
})