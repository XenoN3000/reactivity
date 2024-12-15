import 'react'
import {useEffect} from 'react'
import {Button, Header,  Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {v4 as uuid} from "uuid";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from '../../../app/common/Form/MyTextInput.tsx';
import MyTextArea from '../../../app/common/Form/MyTextArea.tsx';
import MySelectInput from '../../../app/common/Form/MySelectInput.tsx';
import { categoryOptions } from '../../../app/common/options/categoryOptions.ts';
import MyDateInput from '../../../app/common/Form/MyDateInput.tsx';


export default observer(function ActivityForm() {

	const {activityStore} = useStore();
	const {
		createActivity, updateActivity,
		loading, loadActivity, loadingInitial
	} = activityStore;
	const {id} = useParams();
	const navigate = useNavigate();

	const [activity, setActivity] = useState<Activity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: null,
		city: '',
		venue: ''
	});


	const validationSchema = Yup.object<Activity>({
		title: Yup.string().required('Title is required!'),
		description: Yup.string().required('Description is required!'),
		category: Yup.string().required(),
		date: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
	})

	useEffect(() => {

		if (id) loadActivity(id).then(activity => setActivity(activity!));

	}, [id, loadActivity])


	function handleFormSubmit(activity: Activity) {
		if (!activity.id) {
			activity.id = uuid();
			createActivity(activity).then(() => {
				navigate(`/activities/${activity.id}`);
			});
		} else {
			updateActivity(activity).then(() => {
				navigate(`/activities/${activity.id}`);
			});
		}
	
	
	}


	if (loadingInitial) return <LoadingComponent content={"Loading Activity..."}/>;

	return (


		<Segment clearing={true}>
			<Header content={"Activity Details"} sub color='teal'/>
			<Formik validationSchema={validationSchema} enableReinitialize={true} initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
				{({handleSubmit, isValid, isSubmitting, dirty}) => (
					<Form className={'ui form'} onSubmit={handleSubmit} autoComplete="off">

						<MyTextInput placeholder={'Title'}  name={'title'} />
						<MyTextArea rows={3} placeholder={'Description'}  name={'description'} />
						<MySelectInput options={categoryOptions} placeholder={'Category'}  name={'category'} />
						<MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat={'MMMM d, yyyy h:mm aa'} />
						<Header content={"Loaction Details"} sub color='teal'/>
						<MyTextInput placeholder={'City'}  name={'city'} />
						<MyTextInput placeholder={'Venue'}  name={'venue'} />
						<Button 
							disabled={isSubmitting || !dirty || !isValid}
							loading={loading} 
							floated={"right"} 
							positive={true} 
							type="submit" 
							content={'Submit'}
						/>
						<Button as={Link} to={'/activities'} floated={"right"} type="button" content={'Cancel'}/>

					</Form>
				)}
			</Formik>

		</Segment>
	)
})