import React from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

export default function NavigationBar({brand}) {

  return (
    <Navbar bg="light" expand={false} fixed="top">
      <Container fluid="lg">
        <Navbar.Brand >
          <h5>{brand}</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-lavelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              BlackJack
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end">
              <Nav.Link href="/">
                <img
                  src="https://img.icons8.com/ios/24/000000/home--v1.png"
                  alt="home icon"
                />{" "}
                Home
              </Nav.Link>
              <Nav.Link href="/play">
                <img
                  src="https://img.icons8.com/material/24/000000/cards.png"
                  alt="cards icon"
                />{" "}
                Play
              </Nav.Link>
              <Nav.Link href="/how-to-play">
                <img
                  src="https://img.icons8.com/material-outlined/24/000000/rules.png"
                  alt="rules icon"
                />{" "}
                How to Play
              </Nav.Link>
              <Nav.Link href="/about-us">
                <img
                  src="https://img.icons8.com/material/24/000000/info--v1.png"
                  alt="info icon"
                />{" "}
                About Us
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
