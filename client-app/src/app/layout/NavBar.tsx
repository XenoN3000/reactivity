import "react";
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";
import {useStore} from "../stores/store.ts";

export default function NavBar() {
    const {activityStore} = useStore();


    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <MenuItem header>
                    <img src="/assets/Images/logo.png" alt={"logo"}  style={{marginRight: "10px"}} />
                    Reactivity
                </MenuItem>
                <MenuItem name={"Activities"}/>
                <MenuItem>
                    <Button onClick={() =>activityStore.openForm()} positive content={"Create Activiy"}/>
                </MenuItem>
            </Container>

        </Menu>
    )
};
