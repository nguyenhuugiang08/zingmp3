import { loadLink } from "app/linkSlice";
import { loadCurrentSong } from "app/currentSongSilce";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "scss/favoriteartist.scss";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function MixType({ data }) {
  const [favoriteArtist, setFavoriteArtist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setFavoriteArtist(
        data.filter((item) => item.sectionType === "mix")[0].items
      );
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  const handleLoadCurrentSong = (props) => {
    const action = loadCurrentSong(props);
    dispatch(action);
  };

  return (
    <div className="favorite-artist">
      <div className="favorite-artist__title">
        {data.length > 0 &&
          data.filter((item) => item.sectionType === "mix")[0].title}
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
        {favoriteArtist.map((artist, index) => (
          <div className="favorite-artist__card mb-3" key={artist.encodeId}>
            {index >= 5 ? (
              <></>
            ) : (
              <SwiperSlide>
                <div className="favorite-artist__card-wrapper">
                  <div
                    className="favorite-artist__card-wrapper-img"
                    style={{ backgroundImage: `url(${artist.thumbnailM})` }}
                    onClick={() =>
                      handleLoadCurrentSong({
                        encodeId: artist.song.items[0].encodeId,
                        isPlay: true,
                        songs: artist.song.items,
                        index: 0,
                      })
                    }
                  ></div>
                </div>
                <div className="favorite-artist__card-box">
                  <div className="favorite-artist__card-box__name">
                    {artist.artists[0].name}
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    {artist.song.items.map((song, index) => (
                      <div
                        style={{ flex: `${index >= 3 ? "0" : "1"}` }}
                        key={song.encodeId}
                      >
                        {index >= 3 ? (
                          <></>
                        ) : (
                          <div
                            className="favorite-artist__card-box__container me-2"
                            key={song.encodeId}
                          >
                            <Link
                              to={`${artist.link}/${artist.encodeId}`}
                              onClick={() =>
                                handleClickLink(artist.link, "album")
                              }
                            >
                              <div
                                className="favorite-artist__card-box__container-img "
                                style={{
                                  backgroundImage: `url(${song.thumbnail})`,
                                }}
                              ></div>
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            )}
          </div>
        ))}
      </Swiper>
    </div>
  );
}

export default MixType;
