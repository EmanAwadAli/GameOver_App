import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import style from "./GameDetails.module.css";
import Loading from "../Loading/Loading";

export default function GameDetails() {
  let { id } = useParams();

  const [gameDetails, setGameDetails] = useState(null);

  async function getGameDetails(gameId) {
    let { data } = await axios
      .get(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      )
      .catch((err) => console.log(err));
    setGameDetails(data);
  }

  useEffect(() => {
    getGameDetails(id);
  }, []);

  var settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return gameDetails !== null ? (
    <section className="game_details py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className={style.image}>
              <span>
                <img src={gameDetails.thumbnail} alt="" />
              </span>
              <div className="d-flex justify-content-between">
                <span className="free w-25 p-2 text-center rounded-0">
                  Free
                </span>
                {gameDetails.freetogame_profile_ur !== null ? (
                  <Link
                    to={gameDetails.freetogame_profile_url}
                    className="w-75 p-2 text-center"
                  >
                    Play Now
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className={style.details}>
              <h2 className={style.title}>{gameDetails.title}</h2>
              <p>{gameDetails.description}</p>
              {gameDetails.minimum_system_requirements ? (
                <div className={style.requirements}>
                  <h3 className={style.subtitle}>
                    Minimum System Requirements
                  </h3>
                  <ul className="list-unstyled">
                    {gameDetails.minimum_system_requirements?.graphics ? (
                      <li>
                        <strong>Graphics : </strong>
                        {gameDetails.minimum_system_requirements?.graphics}
                      </li>
                    ) : (
                      ""
                    )}
                    {gameDetails.minimum_system_requirements?.memory ? (
                      <li>
                        <strong>Memory : </strong>
                        {gameDetails.minimum_system_requirements?.memory}
                      </li>
                    ) : (
                      ""
                    )}
                    {gameDetails.minimum_system_requirements?.os ? (
                      <li>
                        <strong>OS : </strong>
                        {gameDetails.minimum_system_requirements?.os}
                      </li>
                    ) : (
                      ""
                    )}
                    {gameDetails.minimum_system_requirements?.processor ? (
                      <li>
                        <strong>Processor : </strong>
                        {gameDetails.minimum_system_requirements?.processor}
                      </li>
                    ) : (
                      ""
                    )}
                    {gameDetails.minimum_system_requirements?.storage ? (
                      <li>
                        <strong>Storage : </strong>
                        {gameDetails.minimum_system_requirements?.storage}
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {gameDetails.screenshots ? (
                <div className={style.screenshot}>
                  <h3 className={style.subtitle}>
                    {gameDetails.title} ScreenShots
                  </h3>
                  <Slider {...settings}>
                    {gameDetails.screenshots?.map((screenshot) => (
                      <div key={screenshot.id}>
                        <img
                          src={screenshot.image}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                ""
              )}

              <div className={style.additional_info}>
                <h3 className={style.subtitle}>Additional Information</h3>
                <div className="row">
                  <div className="col-6 col-md-4">
                    <div className={style.item}>
                      <span>Title</span> <br /> {gameDetails.title}
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className={style.item}>
                      <span>Developer</span> <br /> {gameDetails.developer}
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className={style.item}>
                      <span>Publisher</span> <br /> {gameDetails.publisher}
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className={style.item}>
                      <span>Release Date</span> <br />
                      {gameDetails.release_date}
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className={style.item}>
                      <span>Genre</span> <br /> {gameDetails.genre}
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className={style.item}>
                      <span>Platform</span> <br />
                      <i className="fa-brands fa-windows"></i>
                      {gameDetails.platform}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}
