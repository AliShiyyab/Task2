import Create from "./components/Create";
import {Container} from "react-bootstrap";
import Read from "./components/Read";

function App() {
    return (
        <>
            <Container>
                <Create/>
                <Read/>
            </Container>
        </>
    );
}

export default App;
