import React from "react";
import { Toast } from "react-bootstrap";

export default function Toasts({ message, color, show, setShow }) {
  return (
    <Toast
      bg={color}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Blackjack</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
