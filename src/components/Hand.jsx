import React from "react";

export default function Hand({ hand, total, setTotal }) {
  React.useEffect(() => {
    let newTotal = 0;
    let currentAces = [];
    hand.forEach((card) => {
      if (!isNaN(card.value)) newTotal += parseInt(card.value);
      else if (card.value === "ACE") {
        currentAces.push(card.value);
      } else newTotal += 10;
    });
    currentAces.forEach((card) => {
      if (newTotal + 11 <= 21) {
        newTotal += 11;
      } else {
        newTotal += 1;
      }
    });
    setTotal(newTotal);
  }, [hand]);

  return (
    <div className="d-flex flex-row align-items-center">
      <div className="p-4 bg-white border border-dark rounded-circle">
        {total}
      </div>
      <div className="m-5">
        {hand ? (
          hand.map((card, index) => {
            return (
              <img
                src={card.images.png}
                height="150px"
                width="100px"
                key={index}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
