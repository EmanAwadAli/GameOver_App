import React, { useEffect, useState } from "react";
import axios from "axios";
import GameItem from "../GameItem/GameItem";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

export default function AllGames() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(20);

  async function getAllGames() {
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setGames(data);
  }

  useEffect(() => {
    getAllGames();
  }, []);
  return (
    <section className="all_games py-5">
      <div className="container">
        <div className="row">
          {games.length > 0 ? (
            games.slice(0, count).map((game) => (
              <div className="col-sm-6 col-md-4 col-xl-3 mb-4" key={game.id}>
                <GameItem game={game} />
              </div>
            ))
          ) : (
            <CardSkeleton
              cols={`col-sm-6 col-md-4 col-xl-3 mb-4`}
              cards={8}
              detailsCount="3"
              imgHeight={200}
              detailsHeight={20}
            />
          )}
        </div>
        {count < games.length ? (
          <button
            className="btn more_games"
            onClick={() => setCount(count + 20)}
          >
            More Games <i className="fa-solid fa-chevron-right"></i>
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
