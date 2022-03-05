import React from "react";

export default function FlipCard({ front_img_src, name, back_text_color, back_bgcolor }) {
  const [flip, setFlip] = React.useState(false);

  return (
    <div
      className={"card-container " + (flip ? "flipped" : "notFlipped")}
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
    >
      <div className="card-front">
        <img
          className="card-front-img"
          src={front_img_src}
          alt="the image of the backside of a card"
        />
      </div>
      <div className={"card-back " + back_text_color + " " + back_bgcolor}>
        <h1>{name}</h1>
        <p>PSU student</p>
      </div>
    </div>
  );
}
