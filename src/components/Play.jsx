import React from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  ToastContainer,
} from "react-bootstrap";
import useSound from "use-sound";
import drawSound from "../sfx/draw.wav";
import shuffleSound from "../sfx/shuffle.wav";
import loseSound from "../sfx/lose.wav";
import winSound from "../sfx/win.wav";
import Hand from "./Hand.jsx";
import Toasts from "./Toasts.jsx";

export default function Play({
  defaultPayout,
  defaultWinnings,
  defaultMinimum,
}) {
  const [deck, setDeck] = React.useState(null);
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
  const [drawSfx] = useSound(drawSound);
  const [shuffleSfx] = useSound(shuffleSound);
  const [loseSfx] = useSound(loseSound);
  const [winSfx] = useSound(winSound);

  const getNewDeck = async () => {
    const response = await axios
      .get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .catch((error) => console.log(error.message));
    setDeck(response.data);
  };

  React.useEffect(() => {
    getNewDeck();
  }, []);

  const adjustBet = (e) => {
    if (e.target.value <= 1000 && e.target.value >= 1) {
      if (e.target.value >= winnings) setBet(winnings);
      else if (e.target.value < minimum) setBet(minimum);
      else setBet(e.target.value);
    }
  };

  const adjustSecondBet = (e) => {
    if (e.target.value <= 1000 && e.target.value >= 1) {
      if (e.target.value >= winnings) setSecondBet(winnings);
      else if (e.target.value < minimum) setSecondBet(minimum);
      else setSecondBet(e.target.value);
    }
  };

  const newRound = (e) => {
    const dealYourOpeningHand = async () => {
      drawSfx();
      const response = await axios
        .get(
          `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
        )
        .catch((error) => console.log(error));

      setYourHand(response.data.cards);
    };

    const dealDealersOpeningHand = async () => {
      drawSfx();
      const response = await axios
        .get(
          `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
        )
        .catch((error) => console.log(error));

      setDealerHand(response.data.cards);
    };
    //Reset Second Hand if there is one
    setYourSecondHand([]);
    if (deck.remaining < 52) getNewDeck();
    dealYourOpeningHand();
    setTimeout(() => dealDealersOpeningHand(), 1500);

    document.getElementById("deal-button").classList.add("disabled");
    document.getElementById("split-button").classList.add("disabled");
    document.getElementById("hit-button").classList.remove("disabled");
    document.getElementById("stand-button").classList.remove("disabled");
    document.getElementById("double-button").classList.remove("disabled");
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
      setTimeout(() => dealerDraw(), 1500);
    } else {
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("double-button").classList.add("disabled");
      document.getElementById("betWindow").disabled = false;
      setTimeout(() => dealerDraw(), 1500);
    }
  };

  const dealerDraw = async () => {
    drawSfx();
    const response = await axios
      .get(
        `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      )
      .catch((error) => console.log(error));

    let newHand = [...dealerHand, ...response.data.cards];
    setDealerHand(newHand);
  };

  const drawOne = async () => {
    drawSfx();
    const response = await axios
      .get(
        `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      )
      .catch((error) => console.log(error));

    let newHand = [...yourHand, ...response.data.cards];
    setYourHand(newHand);
  };

  const drawOneSecondHand = async () => {
    drawSfx();
    const response = await axios
      .get(
        `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      )
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
      currentBet.value = secondBet * 2;
      setSecondBet(currentBet.value);
      drawOneSecondHand();
      setSecondHandTurn(false);
    } else {
      let currentBet = document.getElementById("betWindow");
      currentBet.value = bet * 2;
      setBet(currentBet.value);
      drawOne();
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("double-button").classList.add("disabled");
      setTimeout(() => dealerDraw(), 1500);
    }
  };

  React.useEffect(() => {
    if (yourTotal === 21) {
      stand();
    } else if (yourTotal > 21) {
      document.getElementById("deal-button").classList.remove("disabled");
      document.getElementById("hit-button").classList.add("disabled");
      document.getElementById("stand-button").classList.add("disabled");
      document.getElementById("double-button").classList.add("disabled");
      document.getElementById("betWindow").disabled = false;
      setMessage(`Bust! -${bet}`);
      setShow(true);
      setWinnings(winnings - bet);
      loseSfx();
    }
  }, [yourTotal]);

  React.useEffect(() => {
    if (secondTotal > 21) {
      setSecondMessage(`Right Hand Bust! -${secondBet}`);
      setSecondShow(true);
      setWinnings(winnings - secondBet);
      setSecondHandTurn(false);
      didSecondhandBust(true);
      loseSfx();
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
    //Set the second turn flag
    setSecondHandTurn(true);
  };

  //Had to add this because the second windows wasn't created till after it rerenders
  React.useEffect(() => {
    if (secondHandTurn) {
      let currentBet = document.getElementById("secondBetWindow");
      document.getElementById("split-button").classList.add("disabled");
      currentBet.value = parseInt(bet);
      setSecondBet(currentBet.value);
    }
  }, [secondHandTurn]);

  React.useEffect(() => {
    if (dealerHand.length <= 1) return;
    else if (dealerTotal < 17) {
      setTimeout(() => dealerDraw(), 1500);
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
      winSfx();
    }
    //Check if there is a second hand and if it did not bust then carry out these checks
    else if (!secondHandBust && secondHand.length > 0) {
      if (dealerTotal > yourTotal && dealerTotal < secondTotal) {
        setMessage(
          `Right hand wins! +${Math.floor(payout * parseInt(secondBet))}`
        );
        setSecondMessage(`You lose! -${parseInt(bet)}`);
        setShow(true);
        setSecondShow(true);
        setWinnings(
          Math.floor(payout * (parseInt(secondBet) + winnings) - parseInt(bet))
        );
        winSfx();
        setTimeout(() => loseSfx(), 1500);
      } else if (dealerTotal > yourTotal && dealerTotal === secondTotal) {
        setMessage("Right hand pushes! +/-0");
        setSecondMessage(`Left hand loses! -${parseInt(bet)}`);
        setShow(true);
        setSecondShow(true);
        setWinnings(winnings - parseInt(bet));
      } else if (dealerTotal > yourTotal && dealerTotal > secondTotal) {
        setMessage(`Both hands lose! -${parseInt(bet) + parseInt(secondBet)}`);
        setShow(true);
        setWinnings(winnings - (parseInt(bet) + parseInt(secondBet)));
        loseSfx();
      }
      //
      else if (dealerTotal < yourTotal && dealerTotal < secondTotal) {
        setMessage(
          `Both hands win! +${Math.floor(
            payout * (parseInt(bet) + parseInt(secondBet))
          )}`
        );
        setShow(true);
        setWinnings(
          Math.floor(payout * (parseInt(bet) + parseInt(secondBet) + winnings))
        );
        winSfx();
      } else if (dealerTotal < yourTotal && dealerTotal === secondTotal) {
        setMessage("Right hand pushes! +/-0");
        setSecondMessage(
          `Left hand wins! +${Math.floor(payout * parseInt(bet))}`
        );
        setShow(true);
        setSecondShow(true);
        setWinnings(Math.floor(payout * (parseInt(bet) + winnings)));
        winSfx();
      } else if (dealerTotal < yourTotal && dealerTotal > secondTotal) {
        setMessage(`Right hand loses! -${parseInt(bet) / 2}`);
        setSecondMessage(
          `Left hand wins! +${Math.floor(payout * parseInt(bet))}`
        );
        setShow(true);
        setWinnings(
          Math.floor(payout * (parseInt(bet) + winnings) - parseInt(secondBet))
        );
        loseSfx();
        setTimeout(() => winSfx(), 1500);
      }
      //
      else if (dealerTotal === yourTotal && dealerTotal < secondTotal) {
        setMessage(
          `Right hand wins! +${Math.floor(payout * parseInt(secondBet))}`
        );
        setSecondMessage("Left hand pushes! +/-0");
        setShow(true);
        setSecondShow(true);
        setWinnings(Math.floor(payout * (parseInt(secondBet) + winnings)));
        winSfx();
      } else if (dealerTotal === yourTotal && dealerTotal === secondTotal) {
        setMessage("Both hands push! +/-0");
        setShow(true);
      } else if (dealerTotal === yourTotal && dealerTotal > secondTotal) {
        setMessage(`Right hand loses! -${parseInt(secondBet)}`);
        setSecondMessage("Left hand pushes! +/-0");
        setShow(true);
        setWinnings(Math.floor(winnings - parseInt(secondBet)));
        loseSfx();
      }
      //
    } else if (dealerTotal > 21 || dealerTotal < yourTotal) {
      setMessage(`You win! +${Math.floor(payout * parseInt(bet))}`);
      setShow(true);
      setWinnings(Math.floor(payout * parseInt(bet)) + winnings);
      winSfx();
    } else if (dealerTotal === yourTotal) {
      setMessage("Push! +/-0");
      setShow(true);
    } else {
      setMessage(`You lose! -${parseInt(secondBet)}`);
      setShow(true);
      setWinnings(winnings - parseInt(bet));
      loseSfx();
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
    <Container fluid className="main-container bg-dark p-0 h-100">
      <ToastContainer className="position-absolute p-4" position="top-end">
        <Toasts message={message} show={show} setShow={setShow} />
        <Toasts
          message={secondMessage}
          show={secondShow}
          setShow={setSecondShow}
        />
      </ToastContainer>
      <Container fluid className="blackjack-table" id="blackjack-table">
        <Container className="d-flex justify-content-center">
          <Hand
            hand={dealerHand}
            total={dealerTotal}
            setTotal={setDealerTotal}
          />
        </Container>
        {secondHandTurn ? (
          <Container className="d-flex justify-content-center" id="player-hand">
            <Hand
              hand={yourHand}
              total={yourTotal}
              setTotal={setYourTotal}
              turn={false}
            />
            {secondHand.length > 0 && (
              <Hand
                hand={secondHand}
                total={secondTotal}
                setTotal={setSecondTotal}
                turn={true}
              />
            )}
          </Container>
        ) : (
          <Container className="d-flex justify-content-center" id="player-hand">
            <Hand
              hand={yourHand}
              total={yourTotal}
              setTotal={setYourTotal}
              turn={true}
            />
            {secondHand.length > 0 && (
              <Hand
                hand={secondHand}
                total={secondTotal}
                setTotal={setSecondTotal}
                turn={false}
              />
            )}
          </Container>
        )}
      </Container>
      <div className="info-container">
        <div className="winnings-window">
          <h4>Winnings</h4>
          {winnings}
        </div>
        <div className="bet-container">
          <div className="bet-window">
            <h5>Bet</h5>
            <Form>
              <input
                className="bet-input"
                onChange={adjustBet}
                value={bet}
                type="number"
                min="1"
                id="betWindow"
              />
            </Form>
          </div>
          {secondHand.length > 0 && (
            <div className="bet-window">
              <h5>Bet</h5>
              <Form>
                <input
                  className="bet-input"
                  onChange={adjustSecondBet}
                  value={secondBet}
                  type="number"
                  min="1"
                  id="secondBetWindow"
                  disabled
                />
              </Form>
            </div>
          )}
        </div>
        <div className="button-container">
          <ButtonGroup className="d-flex align-items-center justify-content-center">
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
            <Button id="split-button" className="disabled" onClick={splitHand}>
              Split
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Container>
  );
}
