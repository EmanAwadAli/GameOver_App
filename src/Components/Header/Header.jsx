import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

export default function Header() {
  return (
    <section className={style.site_header}>
      <div className="container">
        <h2 className={style.heading}>
          Find & track the best <span>free-to-play</span> games!
        </h2>
        <p>
          Track what you've played and search for what to play next! Plus get
          free premium loot!
        </p>
        <Link to="/games/all">Browse Games</Link>
      </div>
    </section>
  );
}
