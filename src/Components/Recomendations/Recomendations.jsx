import axios from "axios";
import React, { useEffect, useState } from "react";
import GameItem from "../GameItem/GameItem";
import "./Recomendations.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

export default function Recomendations() {
  const [games, setGames] = useState([]);

  async function getRecomendations() {
    let { data } = await axios
      .get(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      )
      .catch((err) => console.log(err));
    setGames(data);
  }

  useEffect(() => {
    getRecomendations();
  }, []);

  return (
    <section className="recomendations">
      <div className="container">
        <h2 className="heading">
          <i className="fa-solid fa-robot"></i> Personalized Recommendations
        </h2>
        <div className="row">
          {games.length > 0 ? (
            games.slice(0, 3).map((game) => (
              <div className="col-md-4" key={game.id}>
                <GameItem game={game} />
              </div>
            ))
          ) : (
            <CardSkeleton
              cols={`col-md-4`}
              cards={3}
              detailsCount="1"
              imgHeight={250}
              detailsHeight={40}
            />
          )}
        </div>
      </div>
    </section>
  );
}
