import 'react'
import {ChangeEvent} from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {useState} from "react";

interface Props {
    activity: Activity | undefined,
    closeForm: () => void,
    createOrEdit?: (activity: Activity) => void
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit}: Props) {

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
        if (createOrEdit) {
            createOrEdit(activity);
        }
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
                <Form.Input placeholder={'Date'} value={activity.date} name={'date'} onChange={handleInputChange}/>
                <Form.Input placeholder={'City'} value={activity.city} name={'city'} onChange={handleInputChange}/>
                <Form.Input placeholder={'Venue'} value={activity.venue} name={'venue'} onChange={handleInputChange}/>
                <Button floated={"right"} positive={true} type="submit" content={'Submit'}/>
                <Button onClick={closeForm} floated={"right"} type="button" content={'Cancel'}/>

            </Form>
        </Segment>
    )
}