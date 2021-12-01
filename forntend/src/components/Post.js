import React, {useState} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import axios from "axios";


const Post = ({post, setAllData}) => {

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


    //update data in form
    const onChangeHandler = (e) => {
        setUpdateValue({...updateValue, [e.target.name]: e.target.value})
    }

    const updatePost = async () => {
        const res = await axios.put(`http://localhost:5000/update_post_author/${post.id}`, updateValue);
        console.log(res.data)
    }


    return (

        <Col>
            <Card style={{width: '18rem'}}>
                <img src={post.imageField} style={{width: "100%", height: "200px"}} alt="Image Not Found"/>
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
                                as={"textarea"}
                                type="text"
                                name={"postBody"}
                                value={updateValue.postBody}
                                onChange={onChangeHandler}
                            />
                        </Card.Text>
                        <Card.Text>
                            Time: {post.timestamp}
                        </Card.Text>
                        <Button variant="danger" onClick={() => deletePost(post.id)}>Delete</Button>
                        <Button variant="warning" style={{marginLeft: "5rem"}} onClick={updatePost}>Update</Button>
                    </Form>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default Post;