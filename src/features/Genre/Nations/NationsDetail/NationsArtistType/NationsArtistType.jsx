import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "features/linkSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "scss/Top100Outstanding.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import formatFollow from "utils/formatFollow";

function NationsArtistType({ data }) {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(
      data.sections.filter((section) => section.sectionType === "artist")
    );
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };
  return (
    <div className={`${style.top100Outstanding} mt-0`}>
      {list.map((artist) => (
        <div className="genre-detail-wrapper" key={artist.sectionId}>
          <div className={`${style.mainTitle} `}>
            <div className={`${style.top100OutstandingTiltle} mb-3`}>
              {artist.title}
            </div>
          </div>
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
            {artist.items.map((item, index) => (
              <div key={item.encodeId}>
                <div>
                  {index > 4 ? (
                    <></>
                  ) : (
                    <SwiperSlide>
                      <div
                        className={style.top100OutstandingPar}
                        style={{ borderRadius: "50%" }}
                      >
                        <div
                          className={style.top100OutstandingImage}
                          style={{
                            backgroundImage: `url(${item.thumbnail})`,
                            borderRadius: "50%",
                          }}
                        ></div>
                        <div className={style.top100OutstandingChild}>
                          <div>
                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                          </div>
                          <Link
                            className={style.top100OutstandingPlay}
                            to={`${item.link}/${item.alias}`}
                            onClick={() =>
                              handleClickLink(item.link, "artistdetail")
                            }
                          >
                            <FontAwesomeIcon icon="fa-solid fa-play" />
                          </Link>
                          <div>
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <div className={style.top100OutstandingTitle}>
                          {item.name}
                        </div>
                        <div className="follower">{formatFollow(item.totalFollow)}</div>
                      </div>
                    </SwiperSlide>
                  )}
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}

export default NationsArtistType;
