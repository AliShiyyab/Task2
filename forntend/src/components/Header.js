import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <>
            <Navbar bg="light" variant="" style={{color:"black"}}>
                <Container>
                    <Navbar.Brand href="https://www.liwwa.com/?locale=ar"><img
                        src={"https://www.liwwa.com/static/img/liwwa_logo_new_en.png"}
                        alt={"NotImageFound"}
                        style={{width: "75px"}}
                    />
                    </Navbar.Brand>
                    <Nav className="mr-lg-5">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">Your Profile</Nav.Link>
                        <Nav.Link href="#">Contributions</Nav.Link>
                        <Nav.Link href="#">Sign out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;