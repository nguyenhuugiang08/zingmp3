import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

import 'scss/Event.scss'

function Event({ data }) {
    const [event, setEvent] = useState({})

    useEffect(() => {
        if (data.length > 0) {
            setEvent(data.filter(item => item.sectionType === 'event')[0])
        }
    }, [data])

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
            <div className='eventTitle'>
                {event.title}
            </div>
            <Swiper
                slidesPerView={3}
                slidesPerGroup={3}
                navigation={true}
                modules={[Navigation]}
                className="event-swiper"
            >
                {
                    event.items && event.items.map((event, index) => (
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
                                    {event.startUrlText === 'QUAN T??M' ? 'L?????t ch???c m???ng' : 'L?????t quan t??m'}
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
                                    {event.label === 'SINH NH???T SAO' ?
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
    )
}

export default Event