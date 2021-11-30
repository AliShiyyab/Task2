import React, {useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {EditText, EditTextarea} from "react-edit-text";
import axios from "axios";
import EdiText from 'react-editext';


const Post = ({post, setAuthorName, setPostBody, setAllData}) => {

    //save new data
    const [updatedPost , setUpdatedPost] = useState({
        newAuthor: post.authorName,
        newPostBody: post.postBody
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

    const onSave = (val) =>{
        console.log('Edit Value: ', val);
    }

    return (

        <Col key={Date.now() * Math.random()}>
            <Card style={{width: '18rem'}}>
                <img src={post.imageField} style={{width: "100%", height: "200px"}}/>
                <Card.Body>
                    {/*onChange={(e) => (setUpdatedPost({...updatedPost, newAuthor: e.target.value}))}
                    value={`Author Name: ${updatedPost.newAuthor}`}*/}
                    <EdiText type={"text"} value={`Author Name: ${post.authorName}`} onSave={onSave}/>
                    {/* onChange={(e) => (setUpdatedPost({...updatedPost, newPostBody: e.target.value}))}
                     value={`Body: ${updatedPost.newPostBody}`}*/}
                    <EdiText  type={"text"} value={`Post Body: ${post.postBody}`} onSave={onSave}/>
                    <Card.Text>
                        Time: {post.timestamp}
                    </Card.Text>
                    <Button variant="danger" onClick={() => deletePost(post.id)}>Delete</Button>
                    {/*<Button variant="warning" onClick={() => update_post(post.id)}*/}
                    {/*        style={{marginLeft: "6rem"}}>Post</Button>*/}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Post;