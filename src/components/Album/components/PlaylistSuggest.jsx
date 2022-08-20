import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "app/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Nav, NavItem, Row, NavLink } from "reactstrap";
import styles from "scss/Top100Outstanding.module.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function PlaylistSuggest({ suggestPlaylist }) {
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (suggestPlaylist.length > 0) {
      setPlaylists(
        suggestPlaylist.filter((item) => item.sectionType === "playlist")
      );
    }
  }, [suggestPlaylist]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={styles.top100Outstanding}>
      {playlists.map((playlist, index) => (
        <div key={index}>
          <div className={styles.mainTitle}>
            <div className={styles.top100OutstandingTiltle}>
              {playlist.title}
            </div>
          </div>
          <div className={styles.top100OutstandingContainer}>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              slidesPerGroup={1}
              pagination={true}
              modules={[Pagination]}
              breakpoints={{
                739: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1023: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {playlist.items &&
                playlist.items.map((item, index) => (
                  <div key={index}>
                    {index >= 5 ? (
                      <></>
                    ) : (
                      <SwiperSlide>
                        <div className={styles.top100OutstandingPar}>
                          <div
                            className={styles.top100OutstandingImage}
                            style={{
                              backgroundImage: `url(${item.thumbnail})`,
                            }}
                          ></div>
                          <div className={styles.top100OutstandingChild}>
                            <div>
                              <FontAwesomeIcon icon="fa-regular fa-heart" />
                            </div>
                            <Link
                              className={styles.top100OutstandingPlay}
                              to={`${item.link}/${item.encodeId}`}
                              onClick={() =>
                                handleClickLink(item.link, "album")
                              }
                            >
                              <FontAwesomeIcon icon="fa-solid fa-play" />
                            </Link>
                            <div>
                              <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.top100OutstandingTitle}>
                          {item.title}
                        </div>
                        <div>
                          <Nav>
                            {item.artists &&
                              item.artists.map((artist, index) => (
                                <div
                                  key={index}
                                  className={styles.top100OutstandingArtist}
                                >
                                  <NavItem>
                                    <NavLink
                                      href="#"
                                      className={
                                        styles.top100OutstandingArtistItem
                                      }
                                    >
                                      {index < item.artists.length - 1
                                        ? `${artist.name},`
                                        : `${artist.name}`}
                                    </NavLink>
                                  </NavItem>
                                </div>
                              ))}
                          </Nav>
                        </div>
                      </SwiperSlide>
                    )}
                  </div>
                ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaylistSuggest;
