import React, {useState} from 'react';
import {Button, Card, Col, Form, Modal} from "react-bootstrap";
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
            await axios.delete(`http://localhost:5000/posts/${id}`);
            setAllData(prev => prev.filter(p => p.id !== index))
        } catch (e) {
            console.log(e)
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //update data in form
    const onChangeHandler = (e) => {
        setUpdateValue({...updateValue, [e.target.name]: e.target.value})
    }

    const updatePost = async () => {
        const res = await axios.put(`http://localhost:5000/posts/${post.id}`, updateValue);
        console.log(res.data)
    }


    return (

        <Col>
            <Card style={{width: '20rem', marginTop: "3%", marginBottom: "3%"}} border="primary">
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
                        <Button variant="danger" onClick={handleShow}>Delete</Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete {post.authorName} Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are You sure to delete it</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>
                                    No
                                </Button>
                                <Button variant="danger" onClick={() => {
                                    deletePost(post.id)
                                    handleClose()
                                }}>
                                    Yes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button variant="warning" style={{marginLeft: "8rem"}} onClick={updatePost}>Update</Button>
                    </Form>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default Post;