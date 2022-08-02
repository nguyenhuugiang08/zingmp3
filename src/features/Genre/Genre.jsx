import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import hubhomeApi from 'api/hubhomeApi';
import Topic from './Topic/Topic';
import Nations from './Nations/Nations';
import ListGenre from './ListGenre/ListGenre';
import 'scss/Genre.scss';

function Genre() {
  const [data, setData] = useState({})

  useEffect(() => {
    const getGenreData = async () => {
      try {
        const response = await hubhomeApi.getAll()
        setData(response.data)
      } catch (error) {
        console.log('failed ti fetch data', error)
      }
    }

    getGenreData()
  }, [])

  return (
    <div className='mt-4'>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className="paginationSwiper"
      >
        {data.banners && data.banners.map((banner, index) => (
          <SwiperSlide style={{ borderRadius: '8px', overflow: 'hidden' }} key={index}>
            <Link
              // to={(item.type === 3 || item.type === 4) && `${item.link}/${item.encodeId}`}
              // onClick={item.type === 3 || item.type === 4 ? (() => handleClickLink(item.link, 'album')) : (item.type === 1 ? (() => handleClick({
              //     encodeId: item.encodeId
              // })) : "")}
              to={'/'}
            >
              <img src={banner.cover} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {data.topic ? <Topic data={data} /> : <></> }
      {data.nations ? <Nations data={data} /> : <></> }
      {data.genre ? <ListGenre data={data} /> : <></> }
    </div>
  )
}

export default Genre