import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center h-100">
      <ButtonGroup size="lg">
        <Button href="/play" variant="primary">
          Play
        </Button>
        <Button href="/how-to-play" variant="outline-primary">
          Rules
        </Button>
      </ButtonGroup>
    </Container>
  );
}
