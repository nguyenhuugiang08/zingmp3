import { loadLink } from "app/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Nations({ data }) {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(data.nations);
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="nation">
      <div className="nation-title">quốc gia</div>
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
        }}
        className="mySwiper"
      >
        {list.map((item) => (
          <SwiperSlide
            key={item.encodeId}
            className="mb-3"
          >
            <Link
              className="nation-wrapper"
              to={`${item.link}/${item.encodeId}`}
              onClick={() => handleClickLink(item.link, "nationdetail")}
            >
              <div className="nation-wrapper__thumbnail">
                <div
                  className="nation-wrapper__thumbnail-img"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                ></div>
              </div>
              <div className="nation-wrapper-title">{item.title}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Nations;
