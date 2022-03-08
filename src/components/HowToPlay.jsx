import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

export default function HowToPlay() {
  let navigate = useNavigate();
  return (
    <>
      <NavigationBar brand="How To Play" />
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar no-padding-side body-with-navbar"
      >
        <br />
        <h1
          id="jumbo_h1"
          className="display-4 d-flex align-items-center justify-content-center bg-light"
        >
          How To Play
        </h1>
        <br />
        <Container className="align-items-center justify-content-center text-light rules">
          <br />
          <h2 className="my-2">Basic Rules</h2>
          <text className="my-1">
            Beat the dealer by getting your hand total close to{" "}
            <span className="bg-danger text-white"> 21 </span> but going over{" "}
            <span className="bg-danger text-white"> 21 </span>.
          </text>{" "}
          <text className="my-1 ">
            Start the game by press{" "}
            <span className="bg-success text-white"> Deal </span>. <br />
            If you'd like to draw another card to improve the count, press{" "}
            <span className="bg-air-force-blue text-light"> Hit </span>. <br />
            If you want to stick with your current hand, press{" "}
            <span className="bg-air-force-blue text-light"> Stand </span>.{" "}
            <br />
            When your count is beneficial enough so you would like to double the
            bet, press{" "}
            <span className="bg-air-force-blue text-light"> Double </span>.{" "}
            <br />
            It will give you exactly one more card and increase the initial bet
            by 100%. <br />
            When your initial cards are a pair of the same value and you would
            like to create another hand by splitting the two cards, press{" "}
            <span className="bg-air-force-blue text-light"> Split </span>.
          </text>
          <h3 className="my-2">Payout Rules</h3>
          <text className="my-1">
            When you <span className="bg-warning text-dark"> win </span> a game,
            you get the winning payout depending on your betting amount and
            payout rate. <br /> If the amount of your final bet is 10 and payout
            ratio is 1.5 (same as the 3:2), you will get 10 * 1.5 = 15.
          </text>
          <br />
          <text className="my-1 ">
            When you <span className="bg-warning text-dark"> lose </span> a
            game, you lose all your betting chips.
          </text>
          <h3 className="my-2">Card Values</h3>
          <img
            className="bg-white"
            src="https://img.icons8.com/ios/50/000000/queen-of-clubs.png"
            alt="image of queen of clubs"
          />{" "}
          <img
            className="bg-white"
            src="https://img.icons8.com/ios/50/000000/jack-of-spades.png"
            alt="image of jack of spades"
          />{" "}
          <text className="my-3 ">Picture cards count as 10.</text>{" "}
          <img
            className="bg-white"
            src="https://img.icons8.com/ios/50/000000/ace-of-clubs.png"
            alt="image of ace of clubs"
          />{" "}
          <text className="my-3 ">The ace can count as either 1 or 11.</text>
          <br />
          <text className="my-1 ">
            The rest count their face value. No meaning for card suits.
          </text>
          <br />
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
          <Button href="/" variant="outline-light" id="back-button">
            Back to Home
          </Button>
        </ButtonGroup>
        <br />
      </Container>
    </>
  );
}

