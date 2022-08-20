import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

function Topic({ data }) {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(data.topic);
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="topic mt-5">
      <div className="topic-title">tâm trạng và hoạt động</div>
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
        {list.map((item, index) => (
          <div key={item.encodeId} className="mb-3">
            {index > 7 ? (
              <></>
            ) : (
              <SwiperSlide>
                <Link
                  className="topic-wrapper"
                  to={`${item.link}/${item.encodeId}`}
                  onClick={() => handleClickLink(item.link, "hubdetail")}
                >
                  <div className="topic-wrapper__thumbnail">
                    <div
                      className="topic-wrapper__thumbnail-img"
                      style={{
                        backgroundImage: `url(${item.thumbnailHasText})`,
                      }}
                    ></div>
                  </div>
                  <div className="topic-wrapper-playlist">
                    {item.playlists.map((playlist) => (
                      <div
                        key={playlist.encodeId}
                        className="topic-wrapper-playlist__box"
                      >
                        <div
                          className="topic-wrapper-playlist__box-item"
                          style={{
                            backgroundImage: `url(${playlist.thumbnail})`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </Link>
              </SwiperSlide>
            )}
          </div>
        ))}
      </Swiper>
    </div>
  );
}

export default Topic;
