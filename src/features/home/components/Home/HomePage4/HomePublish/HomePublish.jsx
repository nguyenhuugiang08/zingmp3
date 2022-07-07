import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

function HomePublish({ data }) {
  const [list, setList] = useState([])

  useEffect(() => {
    if (data.length > 0) {
      setList(data[9].items)
    }
  }, [data])

  return (
    <div className='mt-5'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {list.map(item => (
            <SwiperSlide key={item.encodeId}>
              <img className='swiper-slide-image' src={item.thumbnail} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default HomePublish