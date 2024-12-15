import {ErrorMessage, Form, Formik} from "formik";
import MyTextInput from "../../app/common/Form/MyTextInput.tsx";
import {Button, Header, Label} from "semantic-ui-react";
import {useStore} from "../../app/stores/store.ts";
import {observer} from "mobx-react-lite";

export default observer(function LoginForm () {
	const {userStore} = useStore();
	return (
		<Formik initialValues={{email: '', password: '', error: null}} onSubmit={(values, {setErrors}) => userStore.login(values).catch(() =>
			setErrors({error: 'Invalid Email or Password!!!'}))}>

			{({handleSubmit, isSubmitting, errors}) => (
				<Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
					<Header as={'h2'} content={'Login to Reactivities'} color={'teal'} textAlign={"center"}/>
					<MyTextInput placeholder={"Email"} name={"email"}/>
					<MyTextInput placeholder={"Password"} name={"password"} type={'password'}/>
					<ErrorMessage name={'error'}
					              render={() => <Label style={{marginBottom: 10}} basic={true} color={"red"} content={errors.error}/>}/>
					<Button loading={isSubmitting} positive={true} content={'Login'} type={"submit"} fluid={true}/>
				</Form>
			)}
		</Formik>
	)

})