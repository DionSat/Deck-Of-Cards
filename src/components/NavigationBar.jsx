import React from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

export default function NavigationBar({ brand }) {
  return (
    <Navbar bg='light' expand={false} fixed='top' className='navbar'>
      <Container fluid='lg'>
        <Navbar.Brand>
          <h5>{brand}</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar' />
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-lavelledby='offcanvasNavbarLabel'
          placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel'>
              BlackJack
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end' role='navigation'>
              <Nav.Link href={process.env.PUBLIC_URL + "/"}>
                <img
                  src='https://img.icons8.com/windows/24/000000/home.png'
                  alt='home icon'
                />{" "}
                Home
              </Nav.Link>
              <Nav.Link href={process.env.PUBLIC_URL + "/play"}>
                <img
                  src='https://img.icons8.com/material/24/000000/cards.png'
                  alt='cards icon'
                />{" "}
                Play
              </Nav.Link>
              <Nav.Link href={process.env.PUBLIC_URL + "/how-to-play"}>
                <img
                  src='https://img.icons8.com/material-outlined/24/000000/rules.png'
                  alt='rules icon'
                />{" "}
                How to Play
              </Nav.Link>
              <Nav.Link href={process.env.PUBLIC_URL + "/card-values"}>
                <img
                  src='https://img.icons8.com/material/24/000000/roulette.png'
                  alt='roulette icon'
                />{" "}
                Card Values
              </Nav.Link>
              <Nav.Link href={process.env.PUBLIC_URL + "/about-us"}>
                <img
                  src='https://img.icons8.com/material/24/000000/info--v1.png'
                  alt='info icon'
                />{" "}
                About Us
              </Nav.Link>
              <Nav.Link href='https://icons8.com/' className='bottom-nav-link'>
                <img
                  src='https://img.icons8.com/plumpy/24/000000/icons8-logo.png'
                  alt='icons8 icon'
                />{" "}
                all icons from icons8
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
