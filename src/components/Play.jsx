import React from "react";
import axios from "axios";
import { Button, ButtonGroup, Container, Form, Stack } from "react-bootstrap";
import Hand from "./Hand.jsx";
import Toasts from "./Toasts.jsx";
import { Navigate } from "react-router-dom";

export default function Play({ defaultWinnings, defaultMinimum }) {
  const [deckId, setDeckId] = React.useState(null);
  const [yourHand, setYourHand] = React.useState([]);
  const [yourTotal, setYourTotal] = React.useState(0);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [dealerTotal, setDealerTotal] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [winnings, setWinnings] = React.useState(defaultWinnings || 100);
  const [bet, setBet] = React.useState(defaultMinimum || 5);
  const [minimum, setMinimum] = React.useState(defaultMinimum || 5);

  React.useEffect(() => {
    const getDeckId = async () => {
      const response = await axios
        .get(
          `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
        )
        .catch((error) => console.log(error.message));

      setDeckId(response.data.deck_id);
    };

    getDeckId();
  }, []);

  const adjustBet = (e) => {
    if (e.target.value <= winnings && e.target.value >= minimum)
      setBet(e.target.value);
  };

  const newRound = (e) => {
    const dealYourOpeningHand = async () => {
      const response = await axios
        .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .catch((error) => console.log(error));

      setYourHand(response.data.cards);
    };

    const dealDealersOpeningHand = async () => {
      const response = await axios
        .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .catch((error) => console.log(error));

      setDealerHand(response.data.cards);
    };

    dealYourOpeningHand();
    dealDealersOpeningHand();
    document.getElementById("deal-button").classList.add("disabled");
    document.getElementById("hit-button").classList.remove("disabled");
    document.getElementById("stand-button").classList.remove("disabled");
  };

  const stand = async () => {
    const drawOne = async () => {
      const response = await axios
        .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .catch((error) => console.log(error));

      let newHand = [];
      dealerHand.forEach((card) => newHand.push(card));
      newHand.push(response.data.cards[0]);
      setDealerHand(newHand);
    };

    document.getElementById("hit-button").classList.add("disabled");
    document.getElementById("stand-button").classList.add("disabled");
    drawOne();
    document.getElementById("deal-button").classList.remove("disabled");
  };

  const HitMe = async () => {
    const drawOne = async () => {
      const response = await axios
        .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .catch((error) => console.log(error));

      let newHand = [];
      yourHand.forEach((card) => newHand.push(card));
      newHand.push(response.data.cards[0]);
      setYourHand(newHand);
    };

    drawOne();
  };

  React.useEffect(() => {
    if (yourTotal > 21) {
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      setMessage("Bust!");
      setShow(true);
    }
  }, [yourTotal]);

  return (
    <Container fluid className="bg-dark p-0 h-100">
      <Button className="position-absolute top-0 left-0 m-3" size="lg">
        Back
      </Button>
      <div className="position-absolute d-flex flex-row justify-content-center align-items-center h-100 w-100">
        <Toasts message={message} show={show} setShow={setShow} />
      </div>
      <Container
        fluid
        className="blackjack-table d-flex flex-column justify-content-around"
        id="blackjack-table"
      >
        <Container className="d-flex justify-content-center">
          <Hand
            hand={dealerHand}
            total={dealerTotal}
            setTotal={setDealerTotal}
          />
        </Container>
        <Container className="d-flex justify-content-center">
          <Hand hand={yourHand} total={yourTotal} setTotal={setYourTotal} />
        </Container>
      </Container>
      <div
        className="d-flex flex-row bg-light position-absolute bottom-0 rounded m-4 p-2"
        style={{ boxShadow: "5px 5px #b22222" }}
      >
        <h4 style={{ marginRight: "20px" }}>Bet</h4>
        <Form>
          <input
            onChange={adjustBet}
            className="text-center blackjack-bet"
            value={bet}
            type="number"
            min="1"
          />
        </Form>
      </div>
      <div
        className="d-flex flex-column bg-light position-absolute top-0 end-0 rounded m-4 py-1 px-4"
        style={{ boxShadow: "5px 5px #b22222" }}
      >
        <h4>Winnings</h4>
        <h4 className="text-center">{winnings}</h4>
      </div>
      <Stack>
        <ButtonGroup className="position-absolute bottom-0 end-0 m-4 w-25">
          <Button id="deal-button" onClick={newRound} variant="success">
            Deal
          </Button>
          <Button id="hit-button" className="disabled" onClick={HitMe}>
            Hit
          </Button>
          <Button id="stand-button" className="disabled" onClick={stand}>
            Stand
          </Button>
          <Button id="double-button" className="disabled">
            Double
          </Button>
          <Button id="split-button" className="disabled">
            Split
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
}
