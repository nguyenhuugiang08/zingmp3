import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "scss/Top100Outstanding.module.scss";
import { useDispatch } from "react-redux";
import { loadLink } from "features/linkSlice";

function VideoType({ list }) {
  const dispatch = useDispatch();

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };
  return (
    <div>
      <div className={style.top100Outstanding}>
        <div className={style.mainTitle}>
          <div className={style.top100OutstandingTiltle}>MV</div>
        </div>
        <div className={style.top100OutstandingContainer}>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {list.map((mv, index) => (
              <SwiperSlide key={index}>
                <div className={style.top100OutstandingCol}>
                  <div className={style.top100OutstandingPar}>
                    <div
                      className={style.top100OutstandingMv}
                      style={{ backgroundImage: `url(${mv.thumbnail})` }}
                    ></div>
                    <div className={style.top100OutstandingChild}>
                      <Link
                        className={style.top100OutstandingPlay}
                        to={`${mv.link}/${mv.encodeId}`}
                        onClick={() => handleClickLink(mv.link, "mv")}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-play" />
                      </Link>
                    </div>
                  </div>
                  <div className=" d-flex justify-content-start align-items-center mt-1">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        position: "relative",
                        top: "3px",
                      }}
                    >
                      <div
                        className={style.top100OutstandingMvImg}
                        style={{
                          backgroundImage: `url(${
                            mv.artist && mv.artist.thumbnail
                          })`,
                        }}
                      ></div>
                    </div>
                    <div className="ms-2">
                      <div className={style.top100OutstandingTitle}>
                        {mv.title}
                      </div>
                      <Nav>
                        {mv.artists &&
                          mv.artists.map((artist, index) => (
                            <div
                              key={index}
                              className={style.top100OutstandingArtist}
                            >
                              <NavItem>
                                <Link
                                  to={`${artist.link}/${artist.alias}`}
                                  onClick={() =>
                                    handleClickLink(artist.link, "artistdetail")
                                  }
                                  className={style.top100OutstandingArtistItem}
                                  style={{ textDecoration: "none" }}
                                >
                                  {index < mv.artists.length - 1
                                    ? `${artist.name},`
                                    : `${artist.name}`}
                                </Link>
                              </NavItem>
                            </div>
                          ))}
                      </Nav>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default VideoType;
