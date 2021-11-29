import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import Create from "./Create";
import EasyEdit from 'react-easy-edit';

const Read = ({allData, setAllData}) => {

    //Delete functions.
    const deletePost = async (index) => {
        const id = index;
        try {
            await axios.delete(`http://localhost:5000/delete_post/${id}`);
            setAllData(prev => prev.filter(p => p.id !== index))
        } catch (e) {
            console.log(e)
        }
    }


    // const updatePost = async (index) =>{
    //     const id = index;
    //     try{
    //         await axios.put(`http://localhost:5000/update_post/${id}`);
    //         setAllData(prev => prev.filter(p => p.id !== index))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <div>
            <Container>
                <Row>
                    {allData && allData.map((s) => (
                        <Col key={Date.now() * Math.random()}>
                            <Card style={{width: '18rem'}}>
                                <img src={s.imageField} style={{width: "100%", height: "200px"}}/>
                                <Card.Body>
                                    <Card.Title>Author: {s.authorName}</Card.Title>
                                    <Card.Text>
                                        Body: {s.postBody}
                                    </Card.Text>
                                    <Card.Text>
                                        Post time: {s.timestamp}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => deletePost(s.id)}>Delete</Button>
                                    <Button variant="warning" style={{marginLeft: "6rem"}}>Update</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Read;