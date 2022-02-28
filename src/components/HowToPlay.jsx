import React from "react";
import { Button, Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

export default function HowToPlay() {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar"
    >
      <Navbar bg="light" expand={false} fixed="top">
        <Container fluid="lg">
          <Navbar.Brand><h5>BlackJack - How to Play</h5></Navbar.Brand>
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
        How To Play
      </h1>
      <br />
      <Container className="d-flex flex-column align-items-center justify-content-center bg-light scrollbar">
        <p className="my-4 rules">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          quaerat dolor praesentium soluta sequi laboriosam consectetur
          corrupti, eius voluptatibus perspiciatis dolores excepturi possimus
          fuga eveniet ipsa, vero amet esse distinctio! Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Impedit quaerat dolor praesentium
          soluta sequi laboriosam consectetur corrupti, eius voluptatibus
          perspiciatis dolores excepturi possimus fuga eveniet ipsa, vero amet
          esse distinctio!
        </p>
      </Container>
      <br />
      <Button href="/" variant="outline-light" size="lg">
        Back
      </Button>
    </Container>
  );
}
