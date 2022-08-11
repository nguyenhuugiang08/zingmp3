import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "features/linkSlice";
import { loadCurrentSong } from "features/top100/top100Slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "scss/newrelease.scss";

function NewRelease({ data }) {
  const [newRelease, setNewRelease] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setNewRelease(
        data.filter((item) => item.sectionType === "new-release")[0]
      );
    }
  }, [data]);

  const handleClickFilter = (e, type) => {
    let filterElement = document.querySelectorAll(
      ".new-release__filter--left-item"
    );
    filterElement.forEach((element) => {
      element.style.backgroundColor = "#ffffff1a";
    });
    e.target.style.backgroundColor = "#7200a1";

    if (type === "song") {
      let songElement = document.querySelectorAll(".new-release__song");
      let albumElement = document.querySelectorAll(".new-release-album");
      songElement.forEach((item) => {
        item.classList.remove("d-none");
        item.classList.add("d-flex");
      });
      albumElement.forEach((item) => {
        item.classList.add("d-none");
      });
    } else {
      let songElement = document.querySelectorAll(".new-release__song");
      let albumElement = document.querySelectorAll(".new-release-album");
      songElement.forEach((item) => {
        item.classList.add("d-none");
      });
      albumElement.forEach((item) => {
        item.classList.remove("d-none");
        item.classList.add("d-flex");
      });
    }
  };

  const handleLoadCurrentSong = (props) => {
    const action = loadCurrentSong(props);
    dispatch(action);
  };

  const handleLoadCurrentAlbum = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  const handleClickNameArtist = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="new-release">
      <div className="new-release__title">{newRelease.title}</div>
      <div className="new-release__filter">
        <div className="new-release__filter--left">
          <div
            className="new-release__filter--left-item new-release__filter--left-item--active me-3"
            onClick={(e) => handleClickFilter(e, "song")}
          >
            BÀI HÁT
          </div>
          <div
            className="new-release__filter--left-item me-3"
            onClick={(e) => handleClickFilter(e, "album")}
          >
            ALBUM
          </div>
        </div>
        <a href="#" className="new-release__filter--right">
          TẤT CẢ
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-right"
            className="svg-inline--fa fa-chevron-right "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
            ></path>
          </svg>
        </a>
      </div>
      {newRelease.items &&
        newRelease.items.map((item, index) => (
          <div key={index}>
            <Container>
              <Row>
                {item.song.map((song, index) => (
                  <Col key={song.encodeId} xs={12} lg={6} xl={4}>
                    <div className="new-release__song">
                      <div
                        className="new-release__song--wrapper"
                        onClick={() =>
                          handleLoadCurrentSong({
                            encodeId: song.encodeId,
                            isPlay: true,
                            songs: item.song,
                            index: index,
                          })
                        }
                      >
                        <img
                          className="new-release__song-img"
                          src={`${song.thumbnail}`}
                          alt=""
                        />
                        <FontAwesomeIcon
                          className="new-release__song--wrapper-icon"
                          icon="fa-solid fa-play"
                        />
                      </div>
                      <div className="new-release__song-info">
                        <div className="new-release__song-info__title">
                          {song.title}
                          {!song.isWorldWide ? (
                            <div className="new-release__song-vip">
                              <div
                                className="new-release__song-vip__icon"
                                style={{
                                  backgroundImage: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.8/static/media/vip-label.3dd6ac7e.svg)`,
                                }}
                              ></div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="new-release__song-info__artist">
                          {song.artists.map((artist) => (
                            <Link
                              to={`${artist.link}/${artist.alias}`}
                              onClick={() =>
                                handleClickNameArtist(
                                  artist.link,
                                  "artistdetail"
                                )
                              }
                              key={artist.id}
                              className="new-release__song-info__artist-item"
                            >
                              {artist.name},{" "}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="new-release__song--action">
                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row>
                {item.album.map((album) => (
                  <Col key={album.encodeId} xs={12} lg={6} xl={4}>
                    <div className="new-release-album d-none">
                      <Link
                        className="new-release-album--wrapper"
                        to={`${album.link}/${album.encodeId}`}
                        onClick={() =>
                          handleLoadCurrentAlbum(album.link, "album")
                        }
                      >
                        <img
                          className="new-release-album-img"
                          src={`${album.thumbnail}`}
                          alt={`${album.title}`}
                        />
                        <FontAwesomeIcon
                          className="new-release-album--wrapper-icon"
                          icon="fa-solid fa-play"
                        />
                      </Link>
                      <div className="new-release-album-info">
                        <div className="new-release-album-info__title">
                          {album.title}
                        </div>
                        <div className="new-release-album-info__artist">
                          {album.artists.map((artist) => (
                            <Link
                              to={`${artist.link}/${artist.alias}`}
                              onClick={() =>
                                handleClickNameArtist(
                                  artist.link,
                                  "artistdetail"
                                )
                              }
                              key={artist.id}
                              className="new-release__song-info__artist-item"
                            >
                              {artist.name},
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="new-release-album--action">
                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        ))}
    </div>
  );
}

export default NewRelease;
