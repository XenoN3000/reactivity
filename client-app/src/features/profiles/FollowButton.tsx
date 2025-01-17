import 'react'
import { Profile } from '../../app/models/Profile';
import { observer } from 'mobx-react-lite';
import { Button, Reveal } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { SyntheticEvent } from 'react';


interface Props {
    profile: Profile;
}

export function FollowButton({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    if (userStore.user?.username === profile.username) return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        updateFollowing(username, !profile.following);
    }

    return (
        <Reveal animated={"move"}>
            <Reveal.Content visible style={{ width: '100%' }}>
                <Button fluid color={"teal"} content={profile.following ? "Following" : "Not following"} />
            </Reveal.Content>

            <Reveal.Content hidden style={{ width: '100%' }}>
                <Button
                    fluid
                    color={profile.following ? "red" : "green"}
                    content={profile.following ? "Unfollow" : "Follow"}
                    onClick={(e) => handleFollow(e, profile.username)}
                    loading={loading}
                />
            </Reveal.Content>
        </Reveal>
    )
}


export default observer(FollowButton);