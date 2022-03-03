import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Carousel,
  Form,
  Row,
  Col,
  Navbar,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [startingChips, setStartingChips] = useState(5);
  const [minBet, setMinBet] = useState(5);
  const [maxBet, setMaxBet] = useState(1000);
  const [payout, setPayout] = useState(1.5);
  let navigate = useNavigate();

  

  return (
    <>
      <Navbar bg="light" expand={false} fixed="top">
        <Container fluid="lg">
          <Navbar.Brand>
            <h5>BlackJack</h5>
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
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar"
      >
        <br />
        <Carousel variant="light">
          <Carousel.Item className="d-block">
            <img
              className="d-flex home_image"
              src="https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
              alt="the image of cards"
            />
            <Carousel.Caption>
              <h1 id="carousel-caption">BlackJack</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br />
        
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="text-light">Starting Chips</Form.Label>
              <Form.Control
                type="number"
                placeholder="stating chips"
                value={startingChips}
                onChange={(e) => setStartingChips(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-light">Minimum Bet</Form.Label>
              <Form.Control
                type="number"
                placeholder="minimum bet"
                value={minBet}
                onChange={(e) => setMinBet(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="text-light">Pay Out</Form.Label>
              <Form.Control
                type="number"
                placeholder="play out"
                value={payout}
                onChange={(e) => setPayout(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-light">Maximum Bet</Form.Label>
              <Form.Control
                type="number"
                placeholder="maximum bet"
                value={maxBet}
                onChange={(e) => setMaxBet(e.target.value)}
              />
            </Form.Group>
          </Row>
          <br />
          <ButtonGroup size="lg">
            <Button
              variant="light"
              type="submit"
              onClick={async() =>{
                navigate("/play", {
                  state: {
                    startingChips: startingChips,
                    minBet: minBet,
                    maxBet: maxBet,
                    payout: payout,
                  },
                })
              }}
            >
              Play
            </Button>
            <Button href="/how-to-play" variant="outline-light" type="button">
              Rules
            </Button>
          </ButtonGroup>
        

        <br />
      </Container>
    </>
  );
}
