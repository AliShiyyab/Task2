import {Container, Row} from "react-bootstrap";
import 'react-edit-text/dist/index.css';
import Post from "./Post";

const Read = ({allData, setAllData}) => {
    return (
        <div>
            <Container>
                <Row>
                    {allData && allData.map((post) => (
                        <Post post={post}
                              key={post.id}
                              setAllData={setAllData}
                              allData={allData}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Read;