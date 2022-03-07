import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Carousel,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Home() {
  const [startingChips, setStartingChips] = useState(5);
  const [minBet, setMinBet] = useState(5);
  const [maxBet, setMaxBet] = useState(1000);
  const [payout, setPayout] = useState(1.5);
  let navigate = useNavigate();
  const background_image_src =
    "https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80";

  return (
    <>
      <NavigationBar brand="Home" />
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center h-100 bg-dark scrollbar body-with-navbar"
      >
        <Carousel variant="light">
          <Carousel.Item className="d-block">
            <img
              className="d-flex home_image"
              src={background_image_src}
              alt="the image of cards"
            />
            <Carousel.Caption>
              <h1 id="carousel-caption">BlackJack</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br />

        <Row className="mb-3">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip">
                You can change the bet amount each turn.
              </Tooltip>
            }
          >
            <Form.Group as={Col}>
              <Form.Label className="text-light">Starting Chips</Form.Label>
              <Form.Control
                type="number"
                placeholder="stating chips"
                value={startingChips}
                onChange={(e) => setStartingChips(e.target.value)}
              />
            </Form.Group>
          </OverlayTrigger>

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
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip">
                You'll get the betting value times this payout rate when you win.
              </Tooltip>
            }
          >
            <Form.Group as={Col}>
              <Form.Label className="text-light">Pay Out</Form.Label>
              <Form.Control
                type="number"
                placeholder="play out"
                value={payout}
                onChange={(e) => setPayout(e.target.value)}
              />
            </Form.Group>
          </OverlayTrigger>

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
            id="play-submit"
            variant="light"
            type="submit"
            onClick={async () => {
              navigate("/play", {
                state: {
                  startingChips: startingChips,
                  minBet: minBet,
                  maxBet: maxBet,
                  payout: payout,
                },
              });
            }}
          >
            Play
          </Button>
          <Button
            id="rule-button"
            href="/how-to-play"
            variant="outline-light"
            type="button"
          >
            Rules
          </Button>
        </ButtonGroup>
        <br/>
      </Container>
    </>
  );
}
