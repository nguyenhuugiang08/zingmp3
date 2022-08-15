import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "features/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "scss/Top100Outstanding.module.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import formatFollow from "utils/formatFollow";

function Artistjoin({ suggestPlaylist }) {
  const [artist, setrArtist] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (suggestPlaylist.length > 0) {
      setrArtist(
        suggestPlaylist.filter((item) => item.sectionType === "artist")[0]
      );
    }
  }, [suggestPlaylist]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={style.top100Outstanding}>
      <div className={style.mainTitle}>
        <div className={style.top100OutstandingTiltle}>{artist.title}</div>
      </div>
      <div className={style.top100OutstandingContainer}>
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
          {artist.items &&
            artist.items.map((like, index) => (
              <div key={index}>
                {index >= 5 ? (
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
                          backgroundImage: `url(${like.thumbnail})`,
                          borderRadius: "50%",
                        }}
                      ></div>
                      <div className={style.top100OutstandingChild}>
                        <div>
                          <FontAwesomeIcon icon="fa-regular fa-heart" />
                        </div>
                        <Link
                          className={style.top100OutstandingPlay}
                          to={`${like.link}/${like.alias}`}
                          onClick={() =>
                            handleClickLink(like.link, "artistdetail")
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
                        {like.name}
                      </div>
                      <div>{formatFollow(like.totalFollow)}</div>
                    </div>
                  </SwiperSlide>
                )}
              </div>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Artistjoin;
