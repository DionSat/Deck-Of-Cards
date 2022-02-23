import React from "react";
import axios from "axios";
import { Button, ButtonGroup, Container, Form, Stack } from "react-bootstrap";
import Hand from "./Hand.jsx";
import Toasts from "./Toasts.jsx";

export default function Play({ defaultPayout, defaultWinnings, defaultMinimum }) {
  const [deckId, setDeckId] = React.useState(null);
  const [yourHand, setYourHand] = React.useState([]);
  const [yourTotal, setYourTotal] = React.useState(0);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [dealerTotal, setDealerTotal] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [payout, setPayout] = React.useState(defaultPayout || 1.5);
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
    if (e.target.value <= 1000 && e.target.value >= 1) {
      if(e.target.value >= winnings)
        setBet(winnings);
      else if(e.target.value < minimum)
        setBet(minimum);
      else
        setBet(e.target.value);
    }
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
    document.getElementById("double-button").classList.remove("disabled");
    document.getElementById("betWindow").disabled = true;
  };

  const stand = async () => {
    document.getElementById("hit-button").classList.add("disabled");
    document.getElementById("stand-button").classList.add("disabled");
    document.getElementById("deal-button").classList.remove("disabled");
    document.getElementById("double-button").classList.add("disabled");
    document.getElementById("betWindow").disabled = false;
    setTimeout(() => dealerDraw(), 1000);
  };

  const dealerDraw = async () => {
    const response = await axios
      .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .catch((error) => console.log(error));

    let newHand = [...dealerHand, ...response.data.cards];
    setDealerHand(newHand);
  };

  const drawOne = async () => {
    const response = await axios
      .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .catch((error) => console.log(error));

    let newHand = [...yourHand, ...response.data.cards];
    setYourHand(newHand);
  };

  const hitMe = async () => {
    document.getElementById("betWindow").disabled = true;
    drawOne();
  };

  const doubleBet = async () => {
    let currentBet = document.getElementById("betWindow");
    currentBet.value = bet * 2;
    setBet(currentBet.value);
    drawOne();
    document.getElementById("deal-button").classList.remove("disabled");
    document.getElementById("hit-button").classList.add("disabled");
    document.getElementById("stand-button").classList.add("disabled");
    document.getElementById("double-button").classList.add("disabled");
    setTimeout(() => dealerDraw(), 1000);
  };

  React.useEffect(() => {
    if (yourTotal > 21) {
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("double-button").classList.add("disabled");    
      document.getElementById("betWindow").disabled = false;
      setMessage(`Bust! -${bet}`);
      setShow(true);
      setWinnings(winnings - bet);
    }
  }, [yourTotal]);

  React.useEffect(() => {
    if(dealerHand.length <= 1) return;
    else if(dealerTotal < 17) {
      setTimeout(() => dealerDraw(), 1000);
    }
    else if(dealerTotal > 21 || dealerTotal < yourTotal) {
      setMessage(`You win! +${Math.floor(payout * bet)}`);
      setShow(true);
      setWinnings(Math.floor(payout * bet) + winnings);
    }
    else if(dealerTotal === yourTotal) {
      setMessage("Push! +/-0")
      setShow(true);
    }
    else {
      setMessage(`You lose! -${bet}`)
      setShow(true);
      setWinnings(winnings - bet);
    }

  }, [dealerTotal]);

  React.useEffect(() => {
    if(winnings <= 0) {
      document.getElementById("deal-button").classList.add("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("double-button").classList.add("disabled");    
      document.getElementById("betWindow").disabled = true;
      setMessage("Game over!");
      setShow(true);
    }
  }, [winnings]);

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
            id="betWindow"
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
          <Button id="hit-button" className="disabled" onClick={hitMe}>
            Hit
          </Button>
          <Button id="stand-button" className="disabled" onClick={stand}>
            Stand
          </Button>
          <Button id="double-button" className="disabled" onClick={doubleBet}>
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
