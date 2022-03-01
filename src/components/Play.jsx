import React from "react";
import axios from "axios";
import { Button, ButtonGroup, Container, Form, Stack } from "react-bootstrap";
import Hand from "./Hand.jsx";
import Toasts from "./Toasts.jsx";

export default function Play({
  defaultPayout,
  defaultWinnings,
  defaultMinimum,
}) {
  const [deckId, setDeckId] = React.useState(null);
  const [yourHand, setYourHand] = React.useState([]);
  const [secondHand, setYourSecondHand] = React.useState([]);
  const [yourTotal, setYourTotal] = React.useState(0);
  const [secondTotal, setSecondTotal] = React.useState(0);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [dealerTotal, setDealerTotal] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [secondShow, setSecondShow] = React.useState(false);
  const [secondMessage, setSecondMessage] = React.useState("");
  const [payout, setPayout] = React.useState(defaultPayout || 1.5);
  const [winnings, setWinnings] = React.useState(defaultWinnings || 100);
  const [bet, setBet] = React.useState(defaultMinimum || 5);
  const [secondBet, setSecondBet] = React.useState(defaultMinimum || 0);
  const [minimum, setMinimum] = React.useState(defaultMinimum || 5);
  const [secondHandTurn, setSecondHandTurn] = React.useState(false);
  const [secondHandBust, didSecondhandBust] = React.useState(false);

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
      if (e.target.value >= winnings) setBet(winnings);
      else if (e.target.value < minimum) setBet(minimum);
      else setBet(e.target.value);
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
    //Reset Second Hand if there is one
    setYourSecondHand([]);
    dealYourOpeningHand();
    dealDealersOpeningHand();
    document.getElementById("deal-button").classList.add("disabled");
    document.getElementById("hit-button").classList.remove("disabled");
    document.getElementById("stand-button").classList.remove("disabled");
    document.getElementById("double-button").classList.remove("disabled");
    document.getElementById("split-button").classList.remove("disabled");
    document.getElementById("betWindow").disabled = true;
  };

  const stand = async () => {
    if (secondHand.length > 0 && secondHandTurn) {
      setSecondHandTurn(false);
    } else if (secondHand.length > 0 && !secondHandTurn) {
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("double-button").classList.add("disabled");
      document.getElementById("betWindow").disabled = false;
      setTimeout(() => dealerDraw(), 1000);
    } else {
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("double-button").classList.add("disabled");
      document.getElementById("betWindow").disabled = false;
      setTimeout(() => dealerDraw(), 1000);
    }
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

  const drawOneSecondHand = async () => {
    const response = await axios
      .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .catch((error) => console.log(error));

    let newHand = [...secondHand, ...response.data.cards];
    setYourSecondHand(newHand);
  };

  const hitMe = async () => {
    document.getElementById("betWindow").disabled = true;
    if (secondHand.length > 0 && secondHandTurn) {
      drawOneSecondHand();
    } else if (secondHand.length > 0 && !secondHandTurn) {
      drawOne();
    } else {
      drawOne();
    }
  };

  const doubleBet = async () => {
    if (secondHandTurn) {
      let currentBet = document.getElementById("secondBetWindow");
      currentBet.value = bet * 2;
      setSecondBet(currentBet.value);
      drawOne();
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("double-button").classList.add("disabled");
      setTimeout(() => dealerDraw(), 1000);
    } else {
      let currentBet = document.getElementById("betWindow");
      currentBet.value = bet * 2;
      setBet(currentBet.value);
      drawOne();
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("double-button").classList.add("disabled");
      setTimeout(() => dealerDraw(), 1000);
    }
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
    if (secondTotal > 21) {
      setSecondMessage(`Right Hand Bust! -${secondBet}` + `\n left hand turn`);
      setSecondShow(true);
      setWinnings(winnings - secondBet);
      setSecondHandTurn(false);
      didSecondhandBust(true);
    }
  }, [secondTotal]);

  React.useEffect(() => {
    //Check if the start of the game
    if (yourHand.length === 2) {
      //Are the card values the same
      if (yourHand[0].value === yourHand[1].value) {
        document.getElementById("split-button").classList.remove("disabled");
      }
    }
  }, [yourHand]);

  const splitHand = async () => {
    let hand1 = yourHand[0];
    let hand2 = yourHand[1];
    setYourHand([hand1]);
    setYourSecondHand([hand2]);
    /*let currentBet = document.getElementById("secondBetWindow");
    document.getElementById("split-button").classList.add("disabled");
    currentBet.value = bet;
    setSecondBet(currentBet.value);*/
    //Set the second turn flag
    setSecondHandTurn(true);
  };

  //Had to add this because the second windows wasn't created till after it rerenders
  React.useEffect(() => {
    if (secondHandTurn) {
      let currentBet = document.getElementById("secondBetWindow");
      document.getElementById("split-button").classList.add("disabled");
      currentBet.value = bet;
      setSecondBet(currentBet.value);
    }
  }, [secondHandTurn]);

  React.useEffect(() => {
    if (dealerHand.length <= 1) return;
    else if (dealerTotal < 17) {
      setTimeout(() => dealerDraw(), 1000);
    } else if (dealerTotal > 21) {
      setMessage(
        `You win! +${Math.floor(
          payout * (parseInt(bet) + parseInt(secondBet))
        )}`
      );
      setShow(true);
      setWinnings(
        Math.floor(payout * (parseInt(bet) + parseInt(secondBet))) + winnings
      );
    }
    //Check if there is a second hand and if it did not bust then carry out these checks
    else if (!secondHandBust && secondHand.length > 0) {
      if (dealerTotal > yourTotal && dealerTotal < secondTotal) {
        setMessage(
          `Right Hand Wins! +${Math.floor(payout * parseInt(secondBet))}`
        );
        setSecondMessage(`You lose! -${parseInt(bet)}`);
        setShow(true);
        setSecondShow(true);
        setWinnings(
          Math.floor(payout * (parseInt(secondBet) + winnings) - parseInt(bet))
        );
      } else if (dealerTotal > yourTotal && dealerTotal === secondTotal) {
        setMessage("Right Hand Push! +/-0");
        setSecondMessage(`Left Hand Lose! -${parseInt(bet)}`);
        setShow(true);
        setSecondShow(true);
        setWinnings(winnings - parseInt(bet));
      } else if (dealerTotal > yourTotal && dealerTotal > secondTotal) {
        setMessage(`Both Hands Lose! -${parseInt(bet) + parseInt(secondBet)}`);
        setShow(true);
        setWinnings(winnings - (parseInt(bet) + parseInt(secondBet)));
      }
      //
      else if (dealerTotal < yourTotal && dealerTotal < secondTotal) {
        setMessage(
          `Both Hand Wins! +${Math.floor(
            payout * (parseInt(bet) + parseInt(secondBet))
          )}`
        );
        setShow(true);
        setWinnings(
          Math.floor(payout * (parseInt(bet) + parseInt(secondBet) + winnings))
        );
      } else if (dealerTotal < yourTotal && dealerTotal === secondTotal) {
        setMessage("Right Hand Push! +/-0");
        setSecondMessage(
          `Left Hand Wins! +${Math.floor(payout * parseInt(bet))}`
        );
        setShow(true);
        setSecondShow(true);
        setWinnings(Math.floor(payout * (parseInt(bet) + winnings)));
      } else if (dealerTotal < yourTotal && dealerTotal > secondTotal) {
        setMessage(`Right Hands Lose! -${parseInt(bet) / 2}`);
        setSecondMessage(
          `Left Hand Wins! +${Math.floor(payout * parseInt(bet))}`
        );
        setShow(true);
        setWinnings(
          Math.floor(payout * (parseInt(bet) + winnings) - parseInt(secondBet))
        );
      }
      //
      else if (dealerTotal === yourTotal && dealerTotal < secondTotal) {
        setMessage(
          `Right Hand Wins! +${Math.floor(payout * parseInt(secondBet))}`
        );
        setSecondMessage("Left Hand Push! +/-0");
        setShow(true);
        setSecondShow(true);
        setWinnings(Math.floor(payout * (parseInt(secondBet) + winnings)));
      } else if (dealerTotal === yourTotal && dealerTotal === secondTotal) {
        setMessage("Both Hand Push! +/-0");
        setShow(true);
      } else if (dealerTotal === yourTotal && dealerTotal > secondTotal) {
        setMessage(`Right Hands Lose! -${parseInt(secondBet)}`);
        setSecondMessage("Left Hand Push! +/-0");
        setShow(true);
        setWinnings(Math.floor(winnings - parseInt(secondBet)));
      }
      //
    } else if (dealerTotal > 21 || dealerTotal < yourTotal) {
      setMessage(`You win! +${Math.floor(payout * parseInt(bet))}`);
      setShow(true);
      setWinnings(Math.floor(payout * parseInt(bet)) + winnings);
    } else if (dealerTotal === yourTotal) {
      setMessage("Push! +/-0");
      setShow(true);
    } else {
      setMessage(`You lose! -${parseInt(secondBet)}`);
      setShow(true);
      setWinnings(winnings - parseInt(bet));
    }
  }, [dealerTotal]);

  React.useEffect(() => {
    if (winnings <= 0) {
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
    <Container
      fluid
      className="main-container d-flex flex-column bg-dark p-0 h-100"
    >
      <div className="position-absolute d-flex flex-row justify-content-center align-items-center h-100 w-100">
        <Toasts message={message} show={show} setShow={setShow} />
        <Toasts
          message={secondMessage}
          show={secondShow}
          setShow={setSecondShow}
        />
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
        <Container className="d-flex justify-content-center" id="player-hand">
          <Hand hand={yourHand} total={yourTotal} setTotal={setYourTotal} />
          {secondHand.length > 0 && (
            <Hand
              hand={secondHand}
              total={secondTotal}
              setTotal={setSecondTotal}
            />
          )}
        </Container>
      </Container>
      <div
        className='d-flex flex-row bg-light position-absolute bottom-50 rounded m-4 p-2'
        style={{ boxShadow: "5px 5px #b22222" }}>
        <h4 style={{ marginRight: "20px" }}>Bet</h4>
        <Form>
          <input
            onChange={adjustBet}
            className='text-center blackjack-bet'
            value={bet}
            type='number'
            min='1'
            id='betWindow'
          />
        </Form>
      </div>
      {secondHand.length > 0 && (
        <div
          className='d-flex flex-row bg-light position-absolute end-0 bottom-50 rounded m-4 p-2'
          style={{ boxShadow: "5px 5px #b22222" }}>
          <h4 style={{ marginRight: "20px" }}>Bet</h4>
          <Form>
            <input
              onChange={adjustBet}
              className='text-center blackjack-bet'
              value={bet}
              type='number'
              min='1'
              id='secondBetWindow'
              disabled
            />
          </Form>
        </div>
      )}
      <div
        className='d-flex flex-column bg-light position-absolute top-0 end-0 rounded m-4 py-1 px-4'
        style={{ boxShadow: "5px 5px #b22222" }}>
        <h4>Winnings</h4>
        <h4 className='text-center'>{winnings}</h4>
      </div>
    </Container>
  );
}
