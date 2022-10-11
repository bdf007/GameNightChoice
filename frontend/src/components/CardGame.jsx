import React from "react";
import propTypes from "prop-types";
import "./componentsCss/cardGame.css";

function CardGame({ data }) {
  return !data ? (
    <p>Loading...</p>
  ) : (
    <div className="cardsGames">
      <figure className="game show">
        <img src={data.thumb_url} alt={data.handle} />
        <div className="game-info">
          <div className="game-over">
            <h3>{data.name}</h3>
            <p>Overview : {data.description_preview}</p>
            <p>Player Number : {data.players}</p>
            <p>Duration : {data.playtime} minutes</p>
            <p>Age : {data.min_age}+</p>
            <p>Editor : {data.primary_publisher.name}</p>
            <p>Year : {data.year_published}</p>
            <p>
              <a href={data.url} target="_blank" rel="noreferrer">
                {data.name}
              </a>
            </p>
          </div>
          <h2>{data.name}</h2>
        </div>
      </figure>
    </div>
  );
}

CardGame.propTypes = {
  data: propTypes.shape({
    thumb_url: propTypes.string.isRequired,
    handle: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    description_preview: propTypes.string.isRequired,
    players: propTypes.string.isRequired,
    playtime: propTypes.string.isRequired,
    min_age: propTypes.number.isRequired,
    primary_publisher: propTypes.shape({
      name: propTypes.string.isRequired,
    }).isRequired,
    year_published: propTypes.number.isRequired,
    url: propTypes.string.isRequired,
  }).isRequired,
};

export default CardGame;
