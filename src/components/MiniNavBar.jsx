import React from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

export default function MiniNavBar() {
  return (
    <Navbar variant="light" expand={false} placement="end">
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-lavelledby="offcanvasNavbarLabel"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">BlackJack</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end" role="navigation">
            <Nav.Link href="/">
              <img
                src="https://img.icons8.com/ios/24/000000/home--v1.png"
                alt="home icon"
              />{" "}
              Home
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
            <Nav.Link href="https://icons8.com/" className="bottom-nav-link">
              all icons from icons8
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}
