import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container, Row} from "react-bootstrap";

const Read = () => {

    const [allData, setAllData] = useState({
        posts: null
    });

    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:5000/posts')
            setAllData(res.data)
            console.log(res.data)
        }
        getData()
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    {allData.posts && allData.posts.map((s) => (
                        <div key={Date.now() * Math.random()}>
                            <h1>{s.authorName}</h1>
                            <p>{s.timestamp}</p>
                            <h3>{s.postBody}</h3>
                            <img src={s.imageField} style={{width:"500px"}}/>
                        </div>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Read;