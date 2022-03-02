import React from "react";

export default function Hand({ hand, total, setTotal, turn }) {
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
    <div className='d-flex flex-row align-items-center'>
      <div className='hand-total bg-white border border-dark rounded-circle'>
        {total}
      </div>
      {turn ? (
        <div className='m-3'>
          {hand ? (
            hand.map((card, index) => {
              return (
                <img
                  className='card-image'
                  src={card.images.png}
                  key={index}
                  id='card-image-glow'
                />
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div className='m-3'>
          {hand ? (
            hand.map((card, index) => {
              return (
                <img className='card-image' src={card.images.png} key={index} />
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
