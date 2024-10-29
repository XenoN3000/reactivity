import "react";
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";


interface Props {
    openForm: () => void;
}


export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <MenuItem header>
                    <img src="/assets/Images/logo.png" alt={"logo"}  style={{marginRight: "10px"}} />
                    Reactivity
                </MenuItem>
                <MenuItem name={"Activities"}/>
                <MenuItem>
                    <Button onClick={openForm} positive content={"Create Activiy"}/>
                </MenuItem>
            </Container>

        </Menu>
    )
};
