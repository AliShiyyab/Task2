import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

export default function Create({setAllData}) {

    const [postBody, setPostBody] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [imageField, setImageField] = useState('https://ichef.bbci.co.uk/news/976/cpsprodpb/8097/production/_121591923_gettyimages-175818908.jpg');


    const postData = async (e) => {

        try {
            if (authorName.length > 0 && postBody.length > 0) {
                const res = await axios.post('http://localhost:5000/add-post', {
                    authorName,
                    postBody,
                    imageField,
                })
                console.log('POST', res.data)
                setAllData(prev => [res.data.post, ...prev])
            }
            else{
                e.preventDefault()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Form onSubmit={postData} style={{marginTop: "20px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author Name: </Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name"
                                  onChange={(even) => setAuthorName(even.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" placeholder="Article Body"
                                  onChange={(even) => setPostBody(even.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control type="text" placeholder="Image Link"
                                  onChange={(even) => setImageField(even.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Button style={{marginLeft: "45%", marginBottom: "25px"}} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};