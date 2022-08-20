import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import { getId } from "../../../../app/getidSlice";
import ConfirmPlaySong from "./confirmplaysong/ConfirmPlaySong";

import "swiper/css";
import "swiper/css/navigation";
import "scss/Home1.scss";

function HomeSilder({ data }) {
  const [sliders, setLiders] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length !== 0) {
      setLiders(data.filter((item) => item.sectionType === "banner"));
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  const handleClick = ({ encodeId }) => {
    const action = getId(encodeId);
    dispatch(action);
    let ConfirmPlaySongElement = document.querySelector(".overlay_confirm");
    ConfirmPlaySongElement.style.display = "block";
  };

  return (
    <div className="mt-5">
      {sliders.map((slider, index) => (
        <Swiper
          key={index}
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
            slidesPerView: 1,
            spaceBetween: 10,
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
          {slider.items.map((item) => (
            <SwiperSlide key={item.encodeId}>
              <Link
                to={
                  (item.type === 3 || item.type === 4) &&
                  `${item.link}/${item.encodeId}`
                }
                onClick={
                  item.type === 3 || item.type === 4
                    ? () => handleClickLink(item.link, "album")
                    : item.type === 1
                    ? () =>
                        handleClick({
                          encodeId: item.encodeId,
                        })
                    : ""
                }
              >
                {" "}
                <img className="swiper-slide-image" src={item.banner} alt="" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
      <ConfirmPlaySong />
    </div>
  );
}

export default HomeSilder;
