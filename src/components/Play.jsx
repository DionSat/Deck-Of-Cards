import React from "react";
import axios from "axios";
import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import Hand from "./Hand.jsx";

export default function Play() {
  const [deckId, setDeckId] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .then((res) => {
        console.log(res.data);
        setDeckId(res.data.deck_id);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <Container fluid className="bg-dark p-0 h-100">
      <Button className="position-absolute top-0 left-0 m-3" href="/" size="lg">
        Back
      </Button>
      <Container
        fluid
        className="blackjack-table d-flex flex-column justify-content-around"
        id="blackjack-table"
      >
        <Container className="d-flex justify-content-center">
          <Hand deckId={deckId} />
        </Container>
        <Container className="d-flex justify-content-center">
          <Hand deckId={deckId} />
        </Container>
      </Container>
      <div
        className="d-flex flex-row bg-light position-absolute bottom-0 rounded m-4 p-2"
        style={{ boxShadow: "5px 5px #b22222" }}
      >
        <h4 style={{ marginRight: "20px" }}>Bet</h4>
        <input className="text-center blackjack-bet" type="number" min="1" />
      </div>
      <div
        className="d-flex flex-column bg-light position-absolute top-0 end-0 rounded m-4 py-1 px-4"
        style={{ boxShadow: "5px 5px #b22222" }}
      >
        <h4>Winnings</h4>
        <h4 className="text-center">0</h4>
      </div>
      <Stack>
        <ButtonGroup className="position-absolute bottom-0 end-0 m-4 w-25">
          <Button>Hit</Button>
          <Button>Stand</Button>
          <Button>Double</Button>
          <Button>Split</Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
}
