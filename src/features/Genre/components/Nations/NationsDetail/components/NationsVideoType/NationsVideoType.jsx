import React, { useEffect, useState } from "react";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autoplay, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Nav, NavItem } from "reactstrap";
import style from "scss/Top100Outstanding.module.scss";
import { loadCurrentSong } from "app/currentSongSilce";
import PlayMv from "features/Mv/components/PlayMv/PlayMv";
import Portal from "components/Portal";

function NationsVideoType({ data }) {
    const [list, setList] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [encodeId, setEncodeId] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        setList(data.sections.filter((item) => item.sectionType === "video"));
    }, [data]);

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    const handleSendEncodeId = (id) => {
        setEncodeId(id);
        setMounted(true);
        const action = loadCurrentSong({ isPlay: false });
        dispatch(action);
    };

    const handleClosePlayer = () => {
        setMounted(false);
    };

    return (
        <div className={style.top100Outstanding}>
            {list.map((mv, index) => (
                <div key={index}>
                    <div className={style.mainTitle}>
                        <div
                            className={`${style.top100OutstandingTiltle} ps-0`}
                        >
                            {mv.title}
                        </div>
                    </div>
                    <div className={style.top100OutstandingContainer}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            slidesPerGroup={1}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            navigation={true}
                            modules={[Autoplay, Navigation]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
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
                            className='mySwiper'
                        >
                            {mv.items.map((item) => (
                                <SwiperSlide key={item.encodeId}>
                                    <div className={style.top100OutstandingCol}>
                                        <div
                                            className={
                                                style.top100OutstandingPar
                                            }
                                        >
                                            <div
                                                className={
                                                    style.top100OutstandingMv
                                                }
                                                style={{
                                                    backgroundImage: `url(${item.thumbnailM})`,
                                                }}
                                            ></div>
                                            <div
                                                className={
                                                    style.top100OutstandingChild
                                                }
                                            >
                                                <div
                                                    className={
                                                        style.top100OutstandingPlay
                                                    }
                                                    onClick={() =>
                                                        handleSendEncodeId(
                                                            item.encodeId
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon icon='fa-solid fa-play' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' d-flex justify-content-start align-items-center mt-1'>
                                            <div
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    position: "relative",
                                                    top: "3px",
                                                }}
                                            >
                                                <div
                                                    className={
                                                        style.top100OutstandingMvImg
                                                    }
                                                    style={{
                                                        backgroundImage: `url(${
                                                            item.artist &&
                                                            item.artist
                                                                .thumbnail
                                                        })`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className='ms-2'>
                                                <div
                                                    className={
                                                        style.top100OutstandingTitle
                                                    }
                                                >
                                                    {item.title}
                                                </div>
                                                <Nav>
                                                    {item.artists.map(
                                                        (artist, index) => (
                                                            <div
                                                                key={index}
                                                                className={
                                                                    style.top100OutstandingArtist
                                                                }
                                                            >
                                                                <NavItem>
                                                                    <Link
                                                                        to={`${artist.link}/${artist.alias}`}
                                                                        onClick={() =>
                                                                            handleClickLink(
                                                                                artist.link,
                                                                                "artistdetail"
                                                                            )
                                                                        }
                                                                        className={
                                                                            style.top100OutstandingArtistItem
                                                                        }
                                                                        style={{
                                                                            textDecoration:
                                                                                "none",
                                                                        }}
                                                                    >
                                                                        {index <
                                                                        item
                                                                            .artists
                                                                            .length -
                                                                            1
                                                                            ? `${artist.name},`
                                                                            : `${artist.name}`}
                                                                    </Link>
                                                                </NavItem>
                                                            </div>
                                                        )
                                                    )}
                                                </Nav>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ))}
            {!mounted ? (
                <></>
            ) : (
                <Portal containerId='player-main'>
                    <Portal containerId='close-play-mv'>
                        <div
                            className='playmv-container-header__icon'
                            onClick={handleClosePlayer}
                        >
                            <FontAwesomeIcon icon='fa-solid fa-xmark' />
                        </div>
                    </Portal>
                    <PlayMv encodeId={encodeId} />
                </Portal>
            )}
        </div>
    );
}

export default NationsVideoType;
