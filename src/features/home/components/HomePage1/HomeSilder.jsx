import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import ConfirmPlaySong from "./confirmplaysong/ConfirmPlaySong";

import "swiper/css";
import "swiper/css/navigation";
import "scss/Home1.scss";
import Modal from "components/Modal";
import Portal from "components/Portal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import infoSongApi from "api/infoSongApi";
import playlistApi from "api/playlistApi";
import { loadCurrentSong } from "app/currentSongSilce";

function HomeSilder({ data }) {
    const [sliders, setLiders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [encodeId, setEncodeId] = useState("");
    const [infoSong, setInfoSong] = useState({});
    const [array, setarray] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        if (data.length !== 0) {
            setLiders(data.filter((item) => item.sectionType === "banner"));
        }
    }, [data]);

    useEffect(() => {
        const getInfoSong = async () => {
            try {
                const params = {
                    id: encodeId,
                };
                const respone = await infoSongApi.getAll(params);
                setInfoSong(respone.data);
            } catch (error) {
                console.log("error", error);
            }
        };
        getInfoSong();

        return () => {
            setInfoSong({});
        };
    }, [encodeId]);

    useEffect(() => {
        if (infoSong && infoSong.album) {
            const getplaylist = async () => {
                const params = {
                    id: infoSong.album.encodeId,
                };
                const respone = await playlistApi.getAll(params);
                let newList = [
                    ...respone.data.song.items,
                    ...respone.data.sections[0].items,
                ];
                setarray(newList);
            };
            getplaylist();
        }
    }, [infoSong]);

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    function openModal({ encodeId }) {
        setEncodeId(encodeId);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleCloseModalAndPlaySong = (props) => {
        const action = loadCurrentSong(props);
        dispatch(action);
        setIsOpen(false);
    };

    return (
        <div className='mt-5'>
            {sliders.map((slider, index) => (
                <Swiper
                    key={index}
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
                        slidesPerView: 1,
                        spaceBetween: 10,
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
                    {slider.items.map((item) => (
                        <SwiperSlide key={item.encodeId}>
                            <Link
                                to={
                                    (item.type === 3 || item.type === 4) &&
                                    `${item.link}/${item.encodeId}`
                                }
                                onClick={
                                    item.type === 3 || item.type === 4
                                        ? () =>
                                              handleClickLink(
                                                  item.link,
                                                  "album"
                                              )
                                        : item.type === 1
                                        ? () =>
                                              openModal({
                                                  encodeId: item.encodeId,
                                              })
                                        : ""
                                }
                            >
                                {" "}
                                <img
                                    className='swiper-slide-image'
                                    src={item.banner}
                                    alt=''
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ))}
            <Modal isOpen={isOpen}>
                <ConfirmPlaySong encodeId={encodeId} />
                <Portal containerId='modal-close'>
                    <div onClick={closeModal}>BỎ QUA</div>
                </Portal>
                <Portal containerId='modal-play'>
                    <div
                        onClick={() =>
                            handleCloseModalAndPlaySong({
                                encodeId: encodeId,
                                isPlay: true,
                                songs: array,
                                index: array.indexOf(
                                    array.find(
                                        (item) => item.encodeId === encodeId
                                    )
                                ),
                            })
                        }
                    >
                        <FontAwesomeIcon
                            className='me-2'
                            icon='fa-solid fa-play'
                        />
                        PHÁT BÀI HÁT
                    </div>
                </Portal>
            </Modal>
        </div>
    );
}

export default HomeSilder;
