import React, { useEffect, useState } from "react";
import "scss/PodcastH.scss";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function RadioPostcardH({ list }) {
  const [podcastH, setPodcastH] = useState([]);

  useEffect(() => {
    if (list.length > 0) {
      setPodcastH(list.filter((item) => item.sectionType === "podcastH"));
    }
  }, [list]);

  return (
    <div className="podcastH">
      {podcastH.map((podcast) => (
        <div key={podcast.sectionId}>
          <div className="podcastH-title mb-3">{podcast.title}</div>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1023: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="podcastH-swiper"
          >
            {podcast.items.map((item) => (
              <SwiperSlide key={item.encodeId}>
                <div className="podcastH-wrapper">
                  <div
                    className="podcastH-wrapper-background"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  ></div>
                  <div className="podcastH-wrapper-overlay"></div>
                  <div className="podcastH-wrapper-left">
                    <div
                      className="podcastH-wrapper-left__img"
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    ></div>
                  </div>
                  <div className="podcastH-wrapper-right">
                    <div className="podcastH-wrapper-right__name">
                      {item.artists[0].name}
                    </div>
                    <div className="podcastH-wrapper-right__title">
                      {item.title}
                    </div>
                    <div className="podcastH-wrapper-right__description">
                      {item.description}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}

export default RadioPostcardH;
