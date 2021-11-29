import Create from "./components/Create";
import {Container} from "react-bootstrap";
import Read from "./components/Read";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [allData, setAllData] = useState();

    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:5000/posts')
            setAllData(res.data.posts)
            console.log(res.data)
        }
        getData()
    }, [])

    useEffect(() => {
        console.log(allData)
    }, [allData])

    // //Delete functions.
    // const deletePost = async (index) => {
    //     const id = index;
    //     const filterPosts = await axios.delete(`http://localhost:5000/delete_post/${id}`);
    //     await setAllData({"posts": filterPosts.data});
    // }

    return (
        <>
            <Container>
                <Create setAllData={setAllData} allData={allData}/>
                <Read setAllData={setAllData} allData={allData}/>
            </Container>
        </>
    );
}

export default App;
