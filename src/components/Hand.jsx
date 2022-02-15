import React from "react";

export default function Hand({ hand, total, setTotal }) {
  React.useEffect(() => {
    let newTotal = 0;
    hand.forEach((card) => {
      if (!isNaN(card.value)) newTotal += parseInt(card.value);
      else newTotal += 10;
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
