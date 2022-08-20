import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "scss/PlaySong.scss";

function PlaySongRight({ urlImage, title, artists }) {
  const dispatch = useDispatch();

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="play-song__right">
      <div className="play-song__right-box">
        <div
          className="play-song__thumb"
          style={{ backgroundImage: `url(${urlImage})` }}
        ></div>
      </div>
      <div className="play-song__right-wrapper">
        <div className="play-song__right-title">{title}</div>
        <div className="play-song__right-singers">
          {artists && artists.map((artist, index) => (
            <Link
              to={`${artist.link}/${artist.alias}`}
              onClick={() => handleClickLink(artist.link, "artistdetail")}
              className="play-song__right-singer"
              key={index}
            >
              {artist.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="play-song__right-wrapper-btn">
        <button className="play-song__btn">
          <FontAwesomeIcon icon="fa-regular fa-heart" />
        </button>
        <button className="play-song__btn">
          <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
        </button>
      </div>
    </div>
  );
}

export default PlaySongRight;
