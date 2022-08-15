import React, { useEffect, useState } from "react";
import { loadLink } from "features/linkSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "scss/Top100Outstanding.module.scss";
import { Col, Container, Nav, NavItem, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NationsSongType from "../NationsSongType/NationsSongType";
import NationsVideoType from "../NationsVideoType/NationsVideoType";
import NationsArtistType from "../NationsArtistType/NationsArtistType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

function NationsPlaylistType({ data }) {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(
      data.sections.filter((section) => section.sectionType === "playlist")
    );
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={`${styles.top100Outstanding} mt-0`}>
      <div className="genre-detail-banner">
        <div
          className="genre-detail-banner__img"
          style={{ backgroundImage: `url(${data.cover})` }}
        ></div>
        <div className="genre-detail-banner__blur"></div>
      </div>
      {list.map((section, index) => (
        <div className="genre-detail-wrapper" key={index}>
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
            <div className={`${styles.mainTitle} `}>
              <div className={`${styles.top100OutstandingTiltle} ps-0 mb-3`}>
                {section.title}
              </div>
            </div>
            {section.items.map((item, index) => (
              <div key={item.encodeId}>
                <div className={styles.top100OutstandingCol}>
                  {index > 4 ? (
                    <></>
                  ) : (
                    <SwiperSlide>
                      <div className={styles.top100OutstandingPar}>
                        <div
                          className={styles.top100OutstandingImage}
                          style={{ backgroundImage: `url(${item.thumbnail})` }}
                        ></div>
                        <div className={styles.top100OutstandingChild}>
                          <div>
                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                          </div>
                          <Link
                            className={styles.top100OutstandingPlay}
                            to={`${item.link}/${item.encodeId}`}
                            onClick={() => handleClickLink(item.link, "album")}
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
              </div>
            ))}
            {section.title === "Nổi bật" &&
            data.sections &&
            data.sections.filter((section) => section.sectionType === "song")
              .length > 0 ? (
              <NationsSongType data={data} />
            ) : (
              <></>
            )}
            {section.title === "Nổi bật" &&
            data.sections &&
            data.sections.filter((section) => section.sectionType === "video")
              .length > 0 ? (
              <NationsVideoType data={data} />
            ) : (
              <></>
            )}
            {section.title === "Album" &&
            data.sections &&
            data.sections.filter((section) => section.sectionType === "artist")
              .length > 0 ? (
              <NationsArtistType data={data} />
            ) : (
              <></>
            )}
          </Swiper>
        </div>
      ))}
    </div>
  );
}

export default NationsPlaylistType;
