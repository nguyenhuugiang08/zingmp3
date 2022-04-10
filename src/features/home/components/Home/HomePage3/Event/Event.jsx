import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

import 'scss/Event.scss'

function Event({ list }) {
    const [event, setEvent] = useState([])

    useEffect(() => {
        if (list.items) {
            const newList = [...list.items]
            const restList = newList.splice(4, 1)
            setEvent(restList)
        }
    }, [list])

    const handleSubcribe = (e, sub, unSub) => {
        if (e.target.innerText === `${sub}`.toUpperCase()) {
            e.target.innerText = `${unSub}`.toUpperCase()
            Object.assign(e.target.style, {
                backgroundColor: '#7200a1',
                borderColor: '#7200a1'
            })
        } else {
            e.target.innerText = `${sub}`.toUpperCase()
            Object.assign(e.target.style, {
                backgroundColor: '#00000000',
                borderColor: '#ffffff1a'
            })
        }
    }

    return (
        <div className='eventWrapper'>
            {event.map((item, index) => (
                <div key={index}>
                    <div className='eventTitle'>
                        {item.title}
                    </div>
                    <Swiper
                        slidesPerView={3}
                        slidesPerGroup={3}
                        navigation={true}
                        modules={[Navigation]}
                        className="event-swiper"
                    >
                        {
                            item.items.map((event, index) => (
                                <SwiperSlide key={index}>
                                    <div className='overflow'>
                                        <img className='swiper-slide-image' src={event.coverHM} alt="Slide Images" />
                                        <div className='eventOpacity'>
                                            <div className='eventBlock'>
                                                <div className='eventLable'>
                                                    {event.label}
                                                </div>
                                                <div className='eventMainTitle'>
                                                    {event.title}
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='eventCare'>
                                        <div className='eventCongratulate'>
                                            {event.startUrlText === 'QUAN TÂM' ? 'Lượt chức mừng' : 'Lượt quan tâm'}
                                            <div className='followers'>
                                                {event.followers.map(follower => (
                                                    <div key={follower.id}>
                                                        <img className='followerAvatar' src={follower.avatar} alt="" />
                                                    </div>
                                                ))}
                                                +{event.totalFollow / 1000 > 1 ? `${Math.floor(event.totalFollow / 1000)}K` : event.totalFollow - 6}
                                            </div>
                                        </div>
                                        <Link className='action'
                                            onClick={e => handleSubcribe(e, event.unsubscribeText, event.subscribeText)}
                                            to={`${event.startUrlText}`.toUpperCase() === "THAM GIA" ? '/zingchart' : ''}
                                        >
                                            {event.label === 'SINH NHẬT SAO' ?
                                                (`${event.startUrlText}`.toUpperCase() === "THAM GIA" ?
                                                    `${event.startUrlText}`.toUpperCase() :
                                                    `${event.subscribeText}`.toUpperCase()
                                                ) :
                                                (`${event.startUrlText}`.toUpperCase() === "THAM GIA" ?
                                                    `${event.startUrlText}`.toUpperCase() :
                                                    `${event.subscribeText}`.toUpperCase()
                                                )
                                            }
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            ))}
        </div>
    )
}

export default Event