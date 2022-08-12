import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadLink } from "features/linkSlice";
import "scss/Artist.scss";

function Artist({ data }) {
  const [artists, setArtist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setArtist(
        data.filter((item) => item.sectionType === "artistSpotlight")[0].items
      );
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="mt-5">
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
        {artists.map((artist, index) => (
          <SwiperSlide key={index}>
            <Link
              to={`${artist.link}/${artist.alias}`}
              onClick={() => handleClickLink(artist.link, "artistdetail")}
            >
              <img className="artistThumb" src={artist.thumbnail} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Artist;
