import React from "react";
import { Button, Container, } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

export default function HowToPlay() {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar"
    >
      <NavigationBar brand="How To Play"/>
      <br />
      <h1
        id="jumbo_h1"
        className="display-4 d-flex align-items-center justify-content-center bg-light"
      >
        How To Play
      </h1>
      <br />
      <Container className="d-flex flex-column align-items-center justify-content-center bg-light scrollbar rules">
        <h3 className="my-2">Basic Rules</h3>
        <text className="my-1">
          Beat the dealer by getting your hand total close to 21 but going over
          21.
        </text>
        <text className="my-1 text-justify">
          Start the game by press{" "}
          <span className="bg-success text-white"> Deal </span>. If you'd like
          to draw another card to improve the count, press{" "}
          <span className="bg-primary text-light"> Hit </span>. If you want to
          stick with your current hand, press{" "}
          <span className="bg-primary text-light"> Stand </span>. When your
          count is beneficial enough so you would like to double the bet, press{" "}
          <span className="bg-primary text-light"> Double </span>. It will give
          you exactly one more card and increase the initial bet by 100%. When
          your initial cards are a pair of the same value and you would like to
          create another hand by splitting the two cards, press{" "}
          <span className="bg-primary text-light"> Split </span>.
        </text>

        <br />
      </Container>
      <br />
      <Button href="/" variant="outline-light" size="lg">
        Back
      </Button>
    </Container>
  );
}
