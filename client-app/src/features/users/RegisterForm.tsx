import {ErrorMessage, Form, Formik} from "formik";
import MyTextInput from "../../app/common/form/MyTextInput.tsx";
import {Button, Header} from "semantic-ui-react";
import {useStore} from "../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError.tsx";


export default observer(function RegisterForm() {
	const {userStore} = useStore();
	const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;


	return (
		<Formik initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
		        onSubmit={(values, {setErrors}) => userStore.register(values).catch((error) =>
			        setErrors({error}))}
		        validationSchema={Yup.object({
			        displayName: Yup.string().min(2).required(),
			        username: Yup.string().min(3).required(),
			        email: Yup.string().required(),
			        password: Yup.string().min(8, "password is too short - should be at least 8 character").matches(passwordRules).required("password must be at least 8 character and contain at least 1 UpperCase , 1 lowerCase, 1 Number   "),
		        })}
		>

			{({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
				<Form className={'ui form error'} onSubmit={handleSubmit} autoComplete={'off'}>
					<Header as={'h2'} content={'Sign up to Reactivities'} color={'teal'} textAlign={"center"}/>
					<MyTextInput placeholder={"UserName"} name={"username"}/>
					<MyTextInput placeholder={"Display  Name"} name={"displayName"}/>
					<MyTextInput placeholder={"Email"} name={"email"}/>
					<MyTextInput placeholder={"Password"} name={"password"} type={'password'}/>
					<ErrorMessage name={'error'}
					              render={() => <ValidationError errors={errors.error as unknown as string[]}/>}/>
					<Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive={true} content={'Register'} type={"submit"}
					        fluid={true}/>
				</Form>
			)}
		</Formik>
	)

})