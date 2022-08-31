import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadLink } from "app/linkSlice";
import { loadCurrentSong } from "app/currentSongSilce";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "scss/newrelease.scss";
import Modal from "components/Modal";
import NotificationVIP from "components/NotificationVIP";
import Portal from "components/Portal";

function NewReleaseType({ data }) {
    const [newRelease, setNewRelease] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data.length > 0) {
            setNewRelease(
                data.filter((item) => item.sectionType === "new-release")[0]
            );
        }
    }, [data]);

    const handleClickFilter = (e, type) => {
        let filterElement = document.querySelectorAll(
            ".new-release__filter--left-item"
        );
        filterElement.forEach((element) => {
            element.style.backgroundColor = "#ffffff1a";
        });
        e.target.style.backgroundColor = "#7200a1";

        if (type === "song") {
            let songElement = document.querySelectorAll(".new-release__song");
            let albumElement = document.querySelectorAll(".new-release-album");
            songElement.forEach((item) => {
                item.classList.remove("d-none");
                item.classList.add("d-flex");
            });
            albumElement.forEach((item) => {
                item.classList.add("d-none");
            });
        } else {
            let songElement = document.querySelectorAll(".new-release__song");
            let albumElement = document.querySelectorAll(".new-release-album");
            songElement.forEach((item) => {
                item.classList.add("d-none");
            });
            albumElement.forEach((item) => {
                item.classList.remove("d-none");
                item.classList.add("d-flex");
            });
        }
    };

    const handleLoadCurrentSong = (props) => {
        const action = loadCurrentSong(props);
        dispatch(action);
    };

    const handleLoadCurrentAlbum = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    const handleClickNameArtist = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    // xử lý hiển thị thông báo bài hát dành cho tài khoản vip
    const handleOpenNotificationVIP = () => {
        setIsOpen(true);
    };

    //xử lý close thông báo bài hát dành cho tài khoản vip
    const handleCloseNotificationVIP = () => {
        setIsOpen(false);
    };

    return (
        <div className='new-release'>
            <div className='new-release__title'>{newRelease.title}</div>
            <div className='new-release__filter'>
                <div className='new-release__filter--left'>
                    <div
                        className='new-release__filter--left-item new-release__filter--left-item--active me-3'
                        onClick={(e) => handleClickFilter(e, "song")}
                    >
                        BÀI HÁT
                    </div>
                    <div
                        className='new-release__filter--left-item me-3'
                        onClick={(e) => handleClickFilter(e, "album")}
                    >
                        ALBUM
                    </div>
                </div>
            </div>
            {newRelease.items &&
                newRelease.items.map((item, index) => (
                    <div key={index}>
                        <Container fluid>
                            <Row>
                                {item.song.map((song, index) => (
                                    <Col
                                        key={song.encodeId}
                                        xs={12}
                                        lg={6}
                                        xl={4}
                                    >
                                        <div className='new-release__song'>
                                            <div
                                                className='new-release__song--wrapper'
                                                onClick={() => {
                                                    if (!song.isWorldWide) {
                                                        handleOpenNotificationVIP();
                                                    } else {
                                                        handleLoadCurrentSong({
                                                            encodeId:
                                                                song.encodeId,
                                                            isPlay: true,
                                                            songs: item.song,
                                                            index: index,
                                                        });
                                                    }
                                                }}
                                            >
                                                <img
                                                    className='new-release__song-img'
                                                    src={`${song.thumbnail}`}
                                                    alt=''
                                                />
                                                <FontAwesomeIcon
                                                    className='new-release__song--wrapper-icon'
                                                    icon='fa-solid fa-play'
                                                />
                                            </div>
                                            <div className='new-release__song-info'>
                                                <div className='new-release__song-info__title'>
                                                    {song.title}
                                                    {!song.isWorldWide ? (
                                                        <div className='new-release__song-vip'>
                                                            <div
                                                                className='new-release__song-vip__icon'
                                                                style={{
                                                                    backgroundImage: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.8/static/media/vip-label.3dd6ac7e.svg)`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className='new-release__song-info__artist'>
                                                    {song.artists.map(
                                                        (artist, index) => (
                                                            <Link
                                                                to={`${artist.link}/${artist.alias}`}
                                                                onClick={() =>
                                                                    handleClickNameArtist(
                                                                        artist.link,
                                                                        "artistdetail"
                                                                    )
                                                                }
                                                                key={artist.id}
                                                                className='new-release__song-info__artist-item'
                                                            >
                                                                {index <
                                                                song.artists
                                                                    .length -
                                                                    1
                                                                    ? `${
                                                                          artist.name
                                                                      } ${","}`
                                                                    : `${artist.name}`}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className='new-release__song--action'>
                                                <FontAwesomeIcon icon='fa-solid fa-ellipsis' />
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {item.album.map((album) => (
                                    <Col
                                        key={album.encodeId}
                                        xs={12}
                                        lg={6}
                                        xl={4}
                                    >
                                        <div className='new-release-album d-none'>
                                            <Link
                                                className='new-release-album--wrapper'
                                                to={`${album.link}/${album.encodeId}`}
                                                onClick={() =>
                                                    handleLoadCurrentAlbum(
                                                        album.link,
                                                        "album"
                                                    )
                                                }
                                            >
                                                <img
                                                    className='new-release-album-img'
                                                    src={`${album.thumbnail}`}
                                                    alt={`${album.title}`}
                                                />
                                                <FontAwesomeIcon
                                                    className='new-release-album--wrapper-icon'
                                                    icon='fa-solid fa-play'
                                                />
                                            </Link>
                                            <div className='new-release-album-info'>
                                                <div className='new-release-album-info__title'>
                                                    {album.title}
                                                </div>
                                                <div className='new-release-album-info__artist'>
                                                    {album.artists.map(
                                                        (artist, index) => (
                                                            <Link
                                                                to={`${artist.link}/${artist.alias}`}
                                                                onClick={() =>
                                                                    handleClickNameArtist(
                                                                        artist.link,
                                                                        "artistdetail"
                                                                    )
                                                                }
                                                                key={artist.id}
                                                                className='new-release__song-info__artist-item'
                                                            >
                                                                {index <
                                                                album.artists
                                                                    .length -
                                                                    1
                                                                    ? `${artist.name},`
                                                                    : `${artist.name}`}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className='new-release-album--action'>
                                                <FontAwesomeIcon icon='fa-solid fa-ellipsis' />
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                ))}
            <Modal isOpen={isOpen}>
                <NotificationVIP />
                <Portal containerId='close-notification-vip'>
                    <div
                        className='play-song-btn'
                        onClick={handleCloseNotificationVIP}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-xmark' />
                    </div>
                </Portal>
            </Modal>
        </div>
    );
}

export default NewReleaseType;
