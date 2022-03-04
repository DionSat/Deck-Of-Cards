import React from "react";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Row,
  Col,
  Card,
} from "react-bootstrap";

export default function AboutUs() {
  const card_back_image_src =
    "https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png";

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
      <h1 className="display-4 text-light">About Us</h1>
      <h5 className="display-6 bg-light">We are a team of PSU students.</h5>
      <p className="my-2 bg-light">
        The goal if this project is providing accessible web-based BlackJack
        Game.
      </p>

      <br />
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center card-layout"
      >
        <Row className="row-cards">
          <Col sm>
            <Card bg="danger" text="light" border="light">
              <Card.Body>
                <Card.Title>Shane</Card.Title>
                <Card.Text>PSU student</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card bg="success" text="light" border="light">
              <Card.Body>
                <Card.Title>Dion</Card.Title>
                <Card.Text>PSU student</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card bg="warning" text="dark" border="light">
              <Card.Body>
                <Card.Title>Rina</Card.Title>
                <Card.Text>PSU student</Card.Text>
              </Card.Body>
            </Card>
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
