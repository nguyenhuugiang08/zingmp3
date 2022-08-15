import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "features/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Nav } from "reactstrap";
import styles from "scss/Top100Outstanding.module.scss";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArtistSpotlightType from "../ArtistSpotlightType";
import MixType from "../MixType";
import NewReleaseChartType from "../NewReleaseChartType";
import RTChartType from "../RTChartType";
import WeekChartType from "../WeekChartType";

function Top100Outstanding({ data }) {
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length > 0) {
      setPlaylists(data.filter((item) => item.sectionType === "playlist"));
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  console.log(playlists);

  return (
    <div>
      {playlists.map((playlist) => (
        <div>
          <div className={styles.top100Outstanding} key={playlist.sectionId}>
            <div className={styles.mainTitle}>
              <div className={styles.top100OutstandingTiltle}>
                {playlist.title}
              </div>
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
                {playlist.items.map((compo, index) => (
                  <div>
                    {index >= 5 ? (
                      <></>
                    ) : (
                      <SwiperSlide key={compo.encodeId}>
                        <Col className={styles.top100OutstandingCol}>
                          <div className={styles.top100OutstandingPar}>
                            <div
                              className={styles.top100OutstandingImage}
                              style={{
                                backgroundImage: `url(${compo.thumbnail})`,
                              }}
                            ></div>
                            <div className={styles.top100OutstandingChild}>
                              <div>
                                <FontAwesomeIcon icon="fa-regular fa-heart" />
                              </div>
                              <Link
                                className={styles.top100OutstandingPlay}
                                to={`${compo.link}/${compo.encodeId}`}
                                onClick={() =>
                                  handleClickLink(compo.link, "album")
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
                            {compo.title}
                          </div>
                          <div>
                            <Nav>
                              <div className={styles.top100OutstandingArtist}>
                                {compo.artists &&
                                  compo.artists.map((artist, index) => (
                                    <div key={index}>
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
                                    </div>
                                  ))}
                              </div>
                            </Nav>
                          </div>
                        </Col>
                      </SwiperSlide>
                    )}
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
          {playlist.sectionId === "hAutoTheme1" ? (
            <MixType data={data} />
          ) : playlist.sectionId === "hAutoTheme2" ? (
            <div>
              <RTChartType data={data} />
              <WeekChartType data={data} />
              <ArtistSpotlightType data={data} />
            </div>
          ) : playlist.sectionId === "h100" ? (
            <div>
              <NewReleaseChartType data={data} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Top100Outstanding;
