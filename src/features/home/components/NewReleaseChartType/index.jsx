import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "features/linkSlice";
import { loadCurrentSong } from "features/top100/top100Slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Nav, NavItem, Row } from "reactstrap";
import styles from "scss/Home5.module.scss";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function NewReleaseChartType({ data }) {
  const [list, setList] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setList(data.filter((item) => item.sectionType === "newReleaseChart")[0]);
    }
  }, [data]);

  const handleLoadCurrentSong = (props) => {
    const action = loadCurrentSong(props);
    dispatch(action);
  };

  const handleClickNameArtist = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div>
      <div className={styles.home5}>
        <div className={styles.home5Tiltle}>{list.title}</div>
        <div className={styles.home5Container}>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={true}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
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
            {list.items &&
              list.items.map((compo, index) => (
                <div key={index}>
                  {index >= 5 ? (
                    <></>
                  ) : (
                    <SwiperSlide className={styles.home5Col}>
                      <div className={styles.home5Par}>
                        <div
                          className={styles.home5Image}
                          style={{
                            backgroundImage: `url(${compo.thumbnail})`,
                          }}
                        ></div>
                        <div className={styles.home5Child}>
                          <div>
                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                          </div>
                          <div
                            className={styles.home5Play}
                            onClick={() =>
                              handleLoadCurrentSong({
                                encodeId: compo.encodeId,
                                isPlay: true,
                                songs: list.items,
                                index: index,
                              })
                            }
                          >
                            <FontAwesomeIcon icon="fa-solid fa-play" />
                          </div>
                          <div>
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.home5Title}>{compo.title}</div>
                      <div>
                        <Nav>
                          {compo.artists.map((artist, index) => (
                            <div key={index} className={styles.home5Artist}>
                              <NavItem>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`${artist.link}/${artist.alias}`}
                                  onClick={() =>
                                    handleClickNameArtist(
                                      artist.link,
                                      "artistdetail"
                                    )
                                  }
                                  className={styles.home5ArtistItem}
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
    </div>
  );
}

export default NewReleaseChartType;
