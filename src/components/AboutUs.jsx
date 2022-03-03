import React from "react";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Row,
  Col,
} from "react-bootstrap";

export default function AboutUs() {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar"
    >
      <Navbar bg="light" expand={false} fixed="top">
        <Container fluid="lg">
          <Navbar.Brand>
            <h5>BlackJack - About Us</h5>
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
                <Nav.Link href="/">BlackJack</Nav.Link>
                <Nav.Link href="/play">Play</Nav.Link>
                <Nav.Link href="/how-to-play">How to Play</Nav.Link>
                <Nav.Link href="/about-us">About Us</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <br />
      <h1
        id="jumbo_h1"
        className="display-4 d-flex align-items-center justify-content-center bg-light"
      >
        About Us
      </h1>
      <br />
      <Container className="d-flex flex-column align-items-center justify-content-center scrollbar">
        <Row className="justify-content-space-around">
          <Col>
            <img
              className="about-us-image"
              src="https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png"
              alt="the image of the backside of a card"
            />
          </Col>
          <Col>
            <img
              className="about-us-image"
              src="https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png"
              alt="the image of the backside of a card"
            />
          </Col>
          <Col>
            <img
              className="about-us-image"
              src="https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png"
              alt="the image of the backside of a card"
            />
          </Col>
        </Row>
      </Container>
      <br />
      <Button href="/" variant="outline-light" size="lg">
        Back
      </Button>
    </Container>
  );
}