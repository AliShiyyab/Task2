import React, {useState} from 'react';
import {Button, Card, Col, Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import EdiText from 'react-editext';
import data from "bootstrap/js/src/dom/data";
import {EditText} from "react-edit-text";


const Post = ({post, setAllData}) => {

    // const [newAuthorName, setNewAuthorName] = useState(post.authorName);
    // const [newPostBody, setNewPostBody] = useState(post.postBody);
    // const [newImage, setNewImage] = useState(post.imageField);

    const [updateValue, setUpdateValue] = useState({
        authorName: post.authorName,
        postBody: post.postBody,
        imageField: post.imageField
    })

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


    const onChangeHandler = (e) => {
        e.preventDefault()
        setUpdateValue({...updateValue, [e.target.name]: e.target.value})
    }

    const updatePost = async () => {
        const res = await axios.put(`http://localhost:5000/update_post_author/${post.id}`, updateValue);
        console.log(res.data)
    }


    return (

        <Col key={Date.now() * Math.random()}>
            <Card style={{width: '18rem'}}>
                <img src={post.imageField} style={{width: "100%", height: "200px"}}/>
                <Card.Body>
                    <Form>
                        <Card.Text>
                                <Form.Control
                                    type={"text"}
                                    name={"authorName"}
                                    value={updateValue.authorName}
                                    onChange={onChangeHandler}
                                />
                        </Card.Text>
                        <Card.Text>
                            <Form.Control
                                type="text"
                                name={"postBody"}
                                value={updateValue.postBody}
                                onChange={onChangeHandler}
                            />
                        </Card.Text>
                        <Card.Text>
                            Time: {post.timestamp}
                        </Card.Text>
                    </Form>
                    <Button variant="danger" onClick={() => deletePost(post.id)}>Delete</Button>
                    <Button variant="warning" style={{marginLeft: "5rem"}} onClick={updatePost}>Update</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Post;