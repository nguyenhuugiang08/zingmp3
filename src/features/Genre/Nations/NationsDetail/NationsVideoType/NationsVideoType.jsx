import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Nav, NavItem } from "reactstrap";
import style from "scss/Top100Outstanding.module.scss";

function NationsVideoType({ data }) {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(data.sections.filter((item) => item.sectionType === "video"));
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={style.top100Outstanding}>
      {list.map((mv) => (
        <div>
          <div className={style.mainTitle}>
            <div className={`${style.top100OutstandingTiltle} ps-0`}>
              {mv.title}
            </div>
          </div>
          <div className={style.top100OutstandingContainer}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                739: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1023: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {mv.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className={style.top100OutstandingCol}>
                    <div className={style.top100OutstandingPar}>
                      <div
                        className={style.top100OutstandingMv}
                        style={{ backgroundImage: `url(${item.thumbnailM})` }}
                      ></div>
                      <div className={style.top100OutstandingChild}>
                        <Link
                          className={style.top100OutstandingPlay}
                          to={`${item.link}/${item.encodeId}`}
                          onClick={() => handleClickLink(item.link, "mv")}
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
                              item.artist && item.artist.thumbnail
                            })`,
                          }}
                        ></div>
                      </div>
                      <div className="ms-2">
                        <div className={style.top100OutstandingTitle}>
                          {item.title}
                        </div>
                        <Nav>
                          {item.artists.map((artist, index) => (
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
                                  {index < item.artists.length - 1
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
      ))}
    </div>
  );
}

export default NationsVideoType;
