import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

export default function HowToPlay() {
  let navigate = useNavigate();
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar"
    >
      <NavigationBar brand="How To Play" />
      <br />
      <h1
        id="jumbo_h1"
        className="display-4 d-flex align-items-center justify-content-center bg-light"
      >
        How To Play
      </h1>
      <br />
      <Container className="d-flex flex-column align-items-center justify-content-center text-light scrollbar rules">
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
      <ButtonGroup size="lg">
        <Button
          variant="light"
          type="submit"
          id="play-submit"
          onClick={async () => {
            navigate("/play", {
              state: {
                startingChips: 5,
                minBet: 5,
                maxBet: 1000,
                payout: 1.5,
              },
            });
          }}
        >
          Play with Default Settings
        </Button>{" "}
        <Button href="/" variant="outline-light" id="back-button" >
          Back to Home
        </Button>
      </ButtonGroup>
    </Container>
  );
}
