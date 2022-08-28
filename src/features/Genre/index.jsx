import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import hubhomeApi from 'api/hubhomeApi';
import Topic from './components/Topic/Topic';
import Nations from './components/Nations';
import ListGenre from './components/ListGenre';
import 'scss/Genre.scss';
import Loading from './Loading';

function Genre() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState()

  useEffect(() => {
    const getGenreData = async () => {
      try {
        setLoading(true)
        const response = await hubhomeApi.getAll()
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.log('failed ti fetch data', error)
      }
    }

    getGenreData()
  }, [])

  return (
    <div>
      {loading ? <Loading /> :
        <div className='mt-2'>
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
                  to={'/'}
                >
                  <img className='genre-banner' src={banner.cover} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {data.topic ? <Topic data={data} /> : <></>}
          {data.nations ? <Nations data={data} /> : <></>}
          {data.genre ? <ListGenre data={data} /> : <></>}
        </div>
      }
    </div>
  )
}

export default Genre