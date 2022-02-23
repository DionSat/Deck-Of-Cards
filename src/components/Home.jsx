import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Carousel,
  Form,
  Row,
  Col,
  Navbar,
  Nav,
  Offcanvas,
} from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand>BlackJack</Navbar.Brand>
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
                <Nav.Link>Other</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark">
      <Carousel variant="light">
          <Carousel.Item>
            <img className="d-block w-100"
             src="https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
             alt="the image of cards"
            />
          <Carousel.Caption >
            <h1 id="carousel_caption">BlackJack</h1>
          </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br/>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="text-light">Starting Chips</Form.Label>
              <Form.Control type="number" placeholder="stating chips" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-light">Minimum Bet</Form.Label>
              <Form.Control type="number" placeholder="minimum bet" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="text-light">Play Out</Form.Label>
              <Form.Control type="number" placeholder="play out" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-light">Maximum Bet</Form.Label>
              <Form.Control type="number" placeholder="maximum bet" />
            </Form.Group>
          </Row>
        </Form>
        <br/>
        <ButtonGroup size="lg">
          <Button href="/play" variant="light">
            Play
          </Button>
          <Button href="/how-to-play" variant="outline-light">
            Rules
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}
