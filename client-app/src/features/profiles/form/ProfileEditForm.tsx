import 'react'
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput.tsx";
import MyTextArea from "../../../app/common/form/MyTextArea.tsx";


interface Props {
	setEditMode: (editMode: boolean) => void;
}


export function ProfileEditForm({setEditMode}: Props) {

	const {profileStore: {profile, loadingProfile, updateProfile}} = useStore()


	const navigate = useNavigate();


	if (loadingProfile) return <LoadingComponent content={"Loading..."}/>

	return (
		<Segment clearing={true}>
			<Header content={"Edit Profile"} sub color={"teal"}/>

			<Formik initialValues={{bio: profile?.bio, displayName: profile?.displayName}} onSubmit={values => {
				updateProfile(values).then(() => {
					setEditMode(false);
					navigate(`/profiles/${profile!.username}`);
				})
			}}
			        validationSchema={Yup.object({
				        displayName: Yup.string().min(3).required()
			        })}>

				{({isSubmitting, isValid, dirty}) => (
					<Form className={'ui form'}>
						<MyTextInput placeholder={'Display Name'} name={'displayName'}/>
						<MyTextArea placeholder={'Add Your Bio ... '} name={'bio'} rows={4}/>

						<Button positive floated={"right"} loading={isSubmitting} disabled={isSubmitting || !dirty || !isValid}
						        content={'Update Profile'} type={"submit"}/>
					</Form>
				)}

			</Formik>
		</Segment>
	)
}

export default observer(ProfileEditForm)