import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

export default function Create({setAllData}) {

    const [postBody, setPostBody] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [imageField, setImageField] = useState('');

    //Validations
    const [authorNameErrorMessage, setAuthorNameErrorMessage] = useState({});
    const [postBodyErrorMessage, setPostBodyErrorMessage] = useState({});

    const postData = async (e) => {
        e.preventDefault()
        const isValid = formValidation();
        if (isValid === false) {
            e.preventDefault()
            return;

        }

        try {
            const res = await axios.post('http://localhost:5000/posts', {
                authorName,
                postBody,
                imageField,
            })
            e.preventDefault()
            setAllData(prev => [res.data.post, ...prev])
        } catch (e) {
            console.log(e)
        }
    }

    const formValidation = () => {
        const authorNameErrorMessage = {};
        const postBodyErrorMessage = {};
        let isValid = true;

        if (authorName.trim().length < 1) {
            authorNameErrorMessage.posted_byShort = "too short!! it should be more than 5 character";
            isValid = false
        }

        if (postBody.trim().length < 20) {
            postBodyErrorMessage.bodyErrShort = "Add more description please!!";
            isValid = false
        }

        setAuthorNameErrorMessage(authorNameErrorMessage)
        setPostBodyErrorMessage(postBodyErrorMessage)
        return isValid;
    }


    return (
        <div>
            <Form onSubmit={postData} style={{marginTop: "20px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author Name: </Form.Label>
                    <Form.Control type="text"
                                  aria-required={require}
                                  placeholder="Enter Your Name"
                                  onChange={(even) => setAuthorName(even.target.value)}/>
                    {Object.keys(authorNameErrorMessage).map((key) => {
                        return <div style={{color: "red"}}>{authorNameErrorMessage[key]} </div>
                    })}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" placeholder="Article Body"
                                  onChange={(even) => setPostBody(even.target.value)}/>
                    {Object.keys(postBodyErrorMessage).map((key) => {
                        return <div style={{color: "red"}}>{postBodyErrorMessage[key]} </div>
                    })}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control type="text" placeholder="Image Link"
                                  onChange={(even) => setImageField(even.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Button
                        style={{marginLeft: "45%", marginBottom: "25px"}}
                        variant="primary"
                        type="submit"
                        onClick={() => formValidation() ? alert("Successfully") : alert("Empty Fields")}
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
;