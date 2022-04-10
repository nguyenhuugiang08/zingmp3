import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

function HomePublish({ data }) {
  const [list, setList] = useState([])

  useEffect(() => {
    if (data.items) {
      const newList = [...data.items]
      const restList = newList.splice(0, 1)
      setList(restList)
    }
  }, [data])

  console.log(list)
  return (
    <div className='mt-5'>
      {list.map((slider, index) => (
        <Swiper
          key={index}
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {slider.items.map((item, index) => (
            <SwiperSlide key={index}>
              <img className='swiper-slide-image' src={item.thumbnail} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
    </div>
  )
}

export default HomePublish