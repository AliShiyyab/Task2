import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import 'react-edit-text/dist/index.css';
import Post from "./Post";

const Read = ({allData, setAllData}) => {

    const [postBody, setPostBody] = useState('');
    const [authorName, setAuthorName] = useState('');


    return (
        <div>
            <Container>
                <Row>
                    {allData && allData.map((post) => (
                        <Post post={post} key={post.id} setPostBody={setPostBody}
                              setAuthorName={setAuthorName}
                              setAllData={setAllData}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Read;