import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Header, List} from "semantic-ui-react";


function App() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/activities")
            .then(
                response => {
                    setTasks(response.data);
                })
    }, [])

    return (
        <div>
            <Header as='h2' icon='users' content='Lazzy Tasks '/>
            <List>
                {tasks.map((task) => (
                    <List.Item key={task.id}>
                        {
                            task.title
                        }
                    </List.Item>
                ))}
            </List>

        </div>
    )
}

export default App
