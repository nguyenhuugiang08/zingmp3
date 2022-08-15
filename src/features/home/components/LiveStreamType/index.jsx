import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import styles from "scss/Home6.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function LiveStreamType({ data }) {
  const [list, setList] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      setList(data.filter((item) => item.sectionType === "livestream")[0]);
    }
  }, [data]);

  return (
    <div>
      <div className={styles.home6}>
        <div className={styles.home6Tiltle}>{list.title}</div>
        <div className={styles.home6Container}>
          <Swiper
            loop={true}
            slidesPerView={3}
            spaceBetween={10}
            slidesPerGroup={1}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              739: {
                slidesPerView: 5,
                spaceBetween: 20,
                slidesPerGroup: 1,
              },
              1023: {
                slidesPerView: 5,
                spaceBetween: 20,
                slidesPerGroup: 1,
              },
              1400: {
                slidesPerView: 7,
                spaceBetween: 30,
                slidesPerGroup: 1,
              },
            }}
            className="artist-swiper"
          >
            {list.items &&
              list.items.map((compo, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.home6Col}>
                    <div className={styles.home6Par}>
                      <div className={styles.svg}>
                        <svg
                          className="svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          fill="none"
                        >
                          <circle
                            className="svg-circle-bg"
                            stroke="rgba(255, 255, 255, 0.2)"
                            cx="50"
                            cy="50"
                            r="48.75"
                            strokeWidth="2.5"
                          ></circle>
                          <circle
                            className="svg-circle"
                            stroke="#ff4b4a"
                            cx="50"
                            cy="50"
                            r="48.75"
                            strokeWidth="2.5"
                            strokeDasharray="306.3052837250048"
                            strokeDashoffset="145.7316666666667"
                            style={{
                              transition:
                                "stroke-dashoffset 850ms ease-in-out 0s",
                            }}
                          ></circle>
                        </svg>
                      </div>
                      <div
                        className={styles.home6Image}
                        style={{
                          backgroundImage: `url(${
                            compo.program !== undefined &&
                            compo.program.thumbnail
                          })`,
                        }}
                      ></div>
                      <div className={styles.home6Child}>
                        <Link className={styles.home6Play} to={compo.link}>
                          <FontAwesomeIcon icon="fa-solid fa-play" />
                        </Link>
                      </div>
                    </div>
                    <div className={styles.home6Wrapper}>
                      <div
                        className={styles.home6Thumbnail}
                        style={{
                          backgroundImage: `url(${compo.host.thumbnail})`,
                        }}
                      ></div>
                    </div>
                    <div className={styles.home6Title}>{compo.host.name}</div>
                    <div className={styles.home6Live}>
                      <img
                        className={styles.navbarLive}
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/live-tag.svg"
                        alt=""
                      />
                    </div>
                    <div className={styles.home6Users}>
                      {compo.activeUsers} đang nghe
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

export default LiveStreamType;
