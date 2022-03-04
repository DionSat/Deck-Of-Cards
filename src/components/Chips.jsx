import React from "react";
import { Container } from "react-bootstrap";

export default function Chips({ pot }) {
  const [chips, setChips] = React.useState([]);

  React.useEffect(() => {
    if (pot === 0) return;

    let total = pot;
    let newChips = [];
    [
      { value: 100, color: "black" },
      { value: 25, color: "green" },
      { value: 10, color: "blue" },
      { value: 5, color: "red" },
      { value: 1, color: "white" },
    ].forEach((i) => {
      let num = Math.floor(total / i.value);
      total -= num * i.value;

      if (num === 0) return;

      for (let j = 0; j < num; j++) {
        newChips.push({ value: i.value, color: i.color });
      }
    });

    setChips(newChips);
  }, [pot]);

  return (
    <Container className="d-flex flex-row flex-wrap w-100">
      {chips.length > 0 &&
        chips.map((chip, index) => {
          return (
            <div className="chip-outer" key={`${chip.value}-${index}`}>
              <div
                className="chip-inner"
                style={{ backgroundColor: chip.color }}
              >
                {chip.value}
              </div>
            </div>
          );
        })}
    </Container>
  );
}
