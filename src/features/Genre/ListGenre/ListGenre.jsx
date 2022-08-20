import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "app/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Nav, NavItem, Row } from "reactstrap";
import styles from "scss/Top100Outstanding.module.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function ListGenre({ data }) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setList(data.genre);
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div>
      {list.map((genre, index) => (
        <div className={styles.top100Outstanding} key={index}>
          <div className={styles.mainTitle}>
            <div className={`${styles.top100OutstandingTiltle} genre-title`}>{genre.title}</div>
            <Link to="/Top100">
              <span>{"tất cả".toUpperCase()}</span>
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </Link>
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
              {genre.playlists.map((playlist, index) => (
                <div key={playlist.encodeId}>
                  {index >= 5 ? (
                    <></>
                  ) : (
                    <SwiperSlide className={styles.top100OutstandingCol}>
                      <div className={styles.top100OutstandingPar}>
                        <div
                          className={styles.top100OutstandingImage}
                          style={{
                            backgroundImage: `url(${playlist.thumbnail})`,
                          }}
                        ></div>
                        <div className={styles.top100OutstandingChild}>
                          <div>
                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                          </div>
                          <Link
                            className={styles.top100OutstandingPlay}
                            to={`${playlist.link}/${playlist.encodeId}`}
                            onClick={() =>
                              handleClickLink(playlist.link, "album")
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
                        {playlist.title}
                      </div>
                      <div>
                        <Nav>
                          {playlist.artists &&
                            playlist.artists.map((artist, index) => (
                              <div
                                key={index}
                                className={styles.top100OutstandingArtist}
                              >
                                <NavItem>
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`${artist.link}/${artist.alias}`}
                                    onClick={() =>
                                      handleClickLink(
                                        artist.link,
                                        "artistdetail"
                                      )
                                    }
                                    className={
                                      styles.top100OutstandingArtistItem
                                    }
                                  >
                                    {artist.name},
                                  </Link>
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

export default ListGenre;
