import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import FlipCard from "./FlipCard";

export default function AboutUs() {
  const card_back_image_src =
    "https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png";

  return (
    <>
      <NavigationBar brand="About Us" />
      <Container
        fluid
        className="align-items-center justify-content-center h-100 bg-dark scrollbar body-with-navbar"
      >
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center text-align-center bg-dark body-with-navbar"
        >
          <h1 className="display-4 text-light">About Us</h1>
          <h5 className="display-6 text-light">
            We are a team of PSU students.
          </h5>
          <p className="my-2 text-light">
            The goal if this project is providing accessible web-based BlackJack
            Game.
          </p>

          <Row className="row-cards">
            <Col sm className="col-card">
              <FlipCard
                front_img_src={card_back_image_src}
                name="Shane"
                back_text_color="text-danger"
                back_bgcolor="bg-light"
                className="flip-profile"
              />
            </Col>
            <Col sm className="col-card">
              <FlipCard
                front_img_src={card_back_image_src}
                name="Dion"
                back_text_color="text-success"
                back_bgcolor="bg-light"
              />
            </Col>
            <Col sm className="col-card">
              <FlipCard
                front_img_src={card_back_image_src}
                name="Rina"
                back_text_color="text-primary"
                back_bgcolor="bg-light"
              />
            </Col>
          </Row>
          <br />
          <br />
          <Button href="/" variant="outline-light" size="lg">
            Back
          </Button>
        </Container>
        <br />
      </Container>
    </>
  );
}
