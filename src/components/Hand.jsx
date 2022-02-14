import React from "react";
import axios from "axios";

export default function Hand({ deckId }) {
  const [hand, setHand] = React.useState(null);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (!deckId) return;
    axios
      .get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then((res) => {
        console.log(res.data.cards);
        setHand(res.data.cards);
      })
      .catch((error) => console.log(error.message));
  }, [deckId]);

  if (!hand) return "";

  return (
    <div className="d-flex flex-row align-items-center">
      <div className="p-4 bg-white border border-dark rounded-circle">
        {total}
      </div>
      <div className="m-5">
        {hand.map((card, index) => {
          return (
            <img
              src={card.images.png}
              height="150px"
              width="100px"
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
