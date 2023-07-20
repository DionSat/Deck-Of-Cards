import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

export default function CardValues() {
  return (
    <>
      <NavigationBar brand="Card Values" />
      <Container
        fluid
        className="align-items-center justify-content-center h-100 bg-dark scrollbar body-with-navbar"
      >
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center text-align-center bg-dark body-with-navbar"
          role="presentation"
        >
          <h1 className="display-4 text-light">How to Count Card Values</h1>
          <br />
          <Row className="card-values-row">
            <Col xs>
              <img
                className="two-cards-in-a-row"
                src="https://cdn.pixabay.com/photo/2015/08/11/11/57/hearts-884196_1280.png"
                alt="king of hearts"
              />
            </Col>
            <Col xs>
              <img
                className="two-cards-in-a-row"
                src="https://cdn.pixabay.com/photo/2015/08/11/11/57/clubs-884198_1280.png"
                alt="queen of clubs"
              />
            </Col>
            <Col sm className="d-flex flex-column justify-content-center">
              <h2 className="display-6 my-2 text-light text-align-center">
                Picture cards: Count as 10.
              </h2>
            </Col>
          </Row>
          <hr className="white-hr"/>
          <br />
          <Row className="card-values-row">
            <Col xs>
              <img
                className="two-cards-in-a-row"
                src="https://cdn.pixabay.com/photo/2015/08/11/11/57/spades-884187_1280.png"
                alt="ace of spades"
              />
            </Col>
            <Col xs>
              <img
                className="two-cards-in-a-row"
                src="https://cdn.pixabay.com/photo/2015/08/11/11/56/diamonds-884185_1280.png"
                alt="ace of diamonds"
              />
            </Col>
            <Col sm className="d-flex flex-column justify-content-center">
              <h2 className="display-6 my-2 text-light text-align-center">
                Aces: Count as 1 or 11.
              </h2>
            </Col>
          </Row>
          <hr className="white-hr"/>
          <br />
          <Row className="card-values-row">
            <Col xs>
              <img
                className="two-cards-in-a-row"
                src="https://cdn.pixabay.com/photo/2015/08/11/11/55/diamonds-884145_1280.png"
                alt="10 of diamonds"
              />
            </Col>
            <Col xs>
              <img
                className="two-cards-in-a-row"
                src="https://cdn.pixabay.com/photo/2015/08/11/11/56/spades-884178_1280.png"
                alt="8 of spades"
              />
            </Col>
            <Col sm className="d-flex flex-column justify-content-center">
              <h2 className="display-6 my-2 text-light text-align-center">
                The rest: Count their face values.
              </h2>
            </Col>
          </Row>
          <br />
          <br />
          <Button href="/Deck-Of-Cards" variant="outline-light" size="lg">
            Back
          </Button>
        </Container>
        <br />
      </Container>
    </>
  );
}
