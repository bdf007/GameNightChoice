/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from "react";
// eslint-disable-next-line import/no-unresolved
import "@components/componentsCss/cardGame.css";

// eslint-disable-next-line react/prop-types
function CardGame({ data }) {
  return !data ? (
    <p>Loading...</p>
  ) : (
    <div className="cardsGames">
      <figure className="game">
        <img src={data.thumb_url} alt={data.handle} />
        <div className="game-info">
          <div
            className="game-over"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <h2>{data.name}</h2>
        </div>
      </figure>
    </div>
  );
}

export default CardGame;
