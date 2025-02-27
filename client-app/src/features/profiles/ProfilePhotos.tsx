import "react"
import {observer} from "mobx-react-lite";
import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {Photo, Profile} from "../../app/models/Profile.ts";
import {useStore} from "../../app/stores/store.ts";
import {SyntheticEvent, useState} from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget.tsx";


interface Props {
	profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props) {

	const {profileStore: {isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deleteThePhoto}} = useStore();
	const [addPhotoMode, setAddPhotoMode] = useState(false);
	const [target, setTarget] = useState('')

	function handlePhotoUpload(file: Blob) {
		uploadPhoto(file).then(() => {
			setAddPhotoMode(false);
		})
	}

	function hadleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	}

	function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
		setTarget(e.currentTarget.name);
		deleteThePhoto(photo);
	}

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated={"left"} icon={"image"} content={"Photos"}/>
					{isCurrentUser && (
						<Button floated={"right"} basic content={addPhotoMode ? "Cancel" : "Add Photo"}
						        onClick={() => setAddPhotoMode(!addPhotoMode)}/>
					)}
				</Grid.Column>

				<Grid.Column width={16}>
					{addPhotoMode ? (
						<PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
					) : (
						<Card.Group itemsPerRow={5}>
							{
								profile.photos?.map(photo => (

									<Card key={photo.id}>
										<Image src={photo.url}/>
										{isCurrentUser && (
											<Button.Group fluid widths={2}>

												<Button basic color={"green"} content={"Main"} name={'main' + photo.id}
												        disabled={photo.isMain}
												        loading={target === 'main' + photo.id && loading}
												        onClick={(e) => hadleSetMainPhoto(photo, e)}/>
												<Button basic color={"red"} icon={'trash'} name={photo.id} disabled={photo.isMain}
												        loading={target === photo.id && loading}
												        onClick={(e) => handleDeletePhoto(photo, e)}/>

											</Button.Group>
										)}
									</Card>
								))
							}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>

		</Tab.Pane>
	)
})