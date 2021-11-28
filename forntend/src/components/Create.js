import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

export default function Create() {

    const [postBody, setPostBody] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [imageField, setImageField] = useState('');


    const postData = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/add-post', {
                authorName,
                postBody,
                imageField
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Form onSubmit={postData}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author Name: </Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name"
                                  onChange={(even) => setAuthorName(even.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" placeholder="Post Body"
                                  onChange={(even) => setPostBody(even.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control type="text" placeholder="Image Link"
                                  onChange={(even) => setImageField(even.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};