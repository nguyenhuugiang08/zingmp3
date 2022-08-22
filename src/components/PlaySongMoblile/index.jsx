import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import infoSongApi from "api/infoSongApi";
import { loadLink } from "app/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PlaySongMobile() {
  const songData = useSelector((state) => state.currentSong);
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const getInfoSong = async () => {
      const params = {
        id: songData[songData.length - 1].encodeId,
      };
      const response = await infoSongApi.getAll(params);
      setData(response.data);
    };

    getInfoSong();
  }, [songData]);

  //xử lý chuyển trang
  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="play-song-mobile__main">
      <div>
        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
        <div>
          <div className="ms-1 playmv-container__wrapper-title">
            {data.title}
          </div>
          <div className="playmv-container__wrapper-name">
            {data.artists &&
              data.artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`${artist.link}/${artist.alias}`}
                  onClick={() => handleClickLink(artist.link, "artistdetail")}
                  className="ms-1"
                >
                  {artist.name},
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="play-song-mobile__main-thumbnail">
        <div
          className="play-song-mobile__main-thumbnail-img"
          style={{ backgroundImage: `url(${data.thumbnailM})` }}
        ></div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default PlaySongMobile;
