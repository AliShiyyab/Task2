import Create from "./components/Create";
import {Container} from "react-bootstrap";
import Read from "./components/Read";
import {useEffect, useState} from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";

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

    return (
        <>
            <Header/>
            <Container>
                <Create setAllData={setAllData} allData={allData}/>
                <Read setAllData={setAllData} allData={allData}/>
            </Container>
            <Footer/>
        </>
    );
}

export default App;
