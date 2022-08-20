import clsx from "clsx";
import { loadLink } from "app/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import styles from "scss/ZingchartWeek.module.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function WeekChartType({ data }) {
  const [week, setWeek] = useState([]);
  const zingchartData = useSelector((state) => state.zingchartData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setWeek(data.filter((item) => item.sectionType === "weekChart")[0].items);
    }
  }, [data]);

  const classes = clsx(styles.banner);
  const linkClasses = clsx(styles.link);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };
  return (
    <div className="mt-3">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        slidesPerGroup={1}
        pagination={true}
        modules={[Pagination]}
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
        {week.map((item, index) => (
          <SwiperSlide key={index} className="mb-3">
            <Link
              className={linkClasses}
              to={
                zingchartData.length > 0 &&
                `${zingchartData[0].weekChart.us.link}/${zingchartData[0].weekChart.us.playlistId}`
              }
              onClick={() =>
                handleClickLink(zingchartData[0].weekChart.us.link, "chart")
              }
            >
              <img className={classes} src={item.cover} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WeekChartType;
