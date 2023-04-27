import React from "react";
import { Link } from "react-router-dom";
import "./GameItem.css";
export default function GameItem({ game }) {
  return (
    <Link className="game_item" to={`/games/gamedetails/${game.id}`}>
      <div className="image">
        <img src={game.thumbnail} alt="" className="img-fluid" />
      </div>
      <div className="details">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="title">
            {game.title.split(" ").slice(0, 2).join(" ")} ...
          </h3>
          <span className="free">Free</span>
        </div>
        <p className="description">
          {game.short_description.split(" ").slice(0, 3).join(" ")} ...
        </p>
        <div className="genre">
          <i className="fa-solid fa-plus"></i>
          <p>
            <span>{game.genre}</span>
            <i className="fa-brands fa-windows"></i>
          </p>
        </div>
      </div>
    </Link>
  );
}
