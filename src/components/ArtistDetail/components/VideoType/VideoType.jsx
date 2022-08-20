import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import style from "scss/Top100Outstanding.module.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Nav, NavItem } from "reactstrap";

function VideoType({ data }) {
  const [mv, setMv] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.sections && data.sections.length > 0) {
      setMv(
        data.sections.filter((item) => item.sectionType === "video")[0].items
      );
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={style.top100Outstanding}>
      <div className={style.mainTitle}>
        <div className={style.top100OutstandingTiltle}>
          {data.sections &&
            data.sections.filter((item) => item.sectionType === "video")[0]
              .title}
        </div>
        <Link to="/Top100">
          <span>{"tất cả".toUpperCase()}</span>
          <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
        </Link>
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
          {mv &&
            mv.map((mv, index) => (
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
                        {mv.artists.map((artist, index) => (
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
  );
}

export default VideoType;
