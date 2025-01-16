import "react";
import {observer} from 'mobx-react-lite'
import {Segment, Header, Comment, Loader} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store.ts";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {Formik, Form, Field, FieldProps} from "formik";
import * as Yup from "yup";
import {formatDistanceToNow} from "date-fns";

interface Props {
	activityId: string;
}

export default observer(function ActivityDetailedChat({activityId}: Props) {
	const {commentStore} = useStore();

	useEffect(() => {
		if (activityId) {
			commentStore.createHubConnection(activityId)

			return () => {
				commentStore.clearComments()
			}
		}
	}, [commentStore, activityId]);

	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				inverted
				color='teal'
				style={{border: 'none'}}
			>
				<Header>Chat about this event</Header>
			</Segment>
			<Segment attached clearing>
				<Formik initialValues={{body: ''}}
				        onSubmit={(values, {resetForm}) => commentStore.addComment(values).then(() => resetForm())}
				        validationSchema={Yup.object({
					        body: Yup.string().required(),
				        })}
				>
					{({isSubmitting, isValid, handleSubmit}) => (
						<Form className={'ui form'}>
							<Field name={'body'}>
								{(props: FieldProps) => (
									<div style={{position: "relative"}}>
										<Loader active={isSubmitting}/>
										<textarea
											placeholder={"Enter your comment (Enter to submit, SHIFT = ENTER fot new line)"}
											rows={2}
											{...props.field}
											onKeyDown={event => {
												if (event.key === "Enter" && event.shiftKey) {
													return;
												}

												if (event.key === "Enter" && !event.shiftKey) {
													event.preventDefault();
													isValid && handleSubmit();
												}

											}}
										/>
									</div>
								)}
							</Field>
						</Form>
					)}
				</Formik>

				<Comment.Group>
					{commentStore.comments.map(comment => (
						<Comment>
							<Comment.Avatar src={comment.image}/>
							<Comment.Content>
								<Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
								<Comment.Metadata>
									<div>{formatDistanceToNow(comment.createdAt)}</div>
								</Comment.Metadata>
								<Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
							</Comment.Content>
						</Comment>
					))}

				</Comment.Group>
			</Segment>
		</>

	)
})