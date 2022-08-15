import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "scss/CategoryPodcast.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function RadioPostcardCategory({ list }) {
  const [categoryPodcast, setCategoryPodcast] = useState([]);

  useEffect(() => {
    if (list.length > 0) {
      setCategoryPodcast(
        list.filter((item) => item.sectionType === "podcast_category")
      );
    }
  }, [list]);

  return (
    <div className="category-podcast mb-4">
      {categoryPodcast.map((item) => (
        <div key={item.sectionId}>
          <div className="category-podcast__title mb-3">{item.title}</div>
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
            {item.items.map((podcast, index) => (
                <Link to={"/"} key={podcast.id} className="mb-3">
                  {index >= 5 ? (
                    <></>
                  ) : (
                    <SwiperSlide className="category-podcast__wrapper">
                      <div
                        className="category-podcast__wrapper__img"
                        style={{ backgroundImage: `url(${podcast.thumbnail})` }}
                      ></div>
                    </SwiperSlide>
                  )}
                </Link>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}

export default RadioPostcardCategory;
