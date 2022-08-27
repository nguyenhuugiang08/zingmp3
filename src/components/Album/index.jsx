import { Col, Container, Row } from "reactstrap";
import React, { useEffect, useRef, useState } from "react";
import playlistApi from "api/playlistApi";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "scss/Album.module.scss";
import { useDispatch } from "react-redux";
import { loadCurrentSong } from "app/currentSongSilce";
import Loading from "./Loading";
import suggestPlaylistApi from "api/SuggestPlaylistApi";
import Artistjoin from "./components/Artistjoin";
import PlaylistSuggest from "./components/PlaylistSuggest";
import { loadLink } from "app/linkSlice";
import formatTime from "utils/formatTime";
import formatFollow from "utils/formatFollow";

function Anbuml() {
    const { encodeId } = useParams();

    const [playlist, setPlaylist] = useState({});
    const [suggestPlaylist, setSuggestPlaylist] = useState({});
    const [playlistSong, setPlaylistSong] = useState({});
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const getPlayList = async () => {
            const params = {
                id: encodeId,
            };
            setLoading(true);
            const response = await playlistApi.getAll(params);
            setPlaylist(response.data);
            setLoading(false);
        };
        getPlayList();
    }, [encodeId]);

    useEffect(() => {
        const getPlayList = async () => {
            const params = {
                id: encodeId,
            };
            setLoading(true);
            const response = await suggestPlaylistApi.getAll(params);
            setSuggestPlaylist(response.data);
            setLoading(false);
        };
        getPlayList();
    }, [encodeId]);

    useEffect(() => {
        if (playlist.song) {
            setPlaylistSong(playlist.song);
        }
    }, [playlist]);

    useEffect(() => {
        if (playlistSong.items) {
            setSongs(playlistSong.items);
        }
    }, [playlistSong]);

    useEffect(() => {
        if (playlist.artists) {
            setArtists(playlist.artists);
        }
    }, [playlist]);

    const handleClick = (props) => {
        const action = loadCurrentSong(props);
        dispatch(action);
    };

    const d = new Date();
    const thumbRef = useRef();
    let sumDuration = 0;
    songs.map((item) => (sumDuration += item.duration * 1));

    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className={styles.Album}>
                    <Container>
                        <Row>
                            <Col
                                xs={12}
                                md={12}
                                lg={3}
                                className="overflow-hidden"
                            >
                                <div className={styles.albumMain}>
                                    <div
                                        style={{
                                            flex: "1",
                                        }}
                                    >
                                        <div
                                            ref={thumbRef}
                                            className={styles.albumThumb}
                                            style={{
                                                backgroundImage: `url(${playlist.thumbnailM})`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className={styles.albumInfoPlaylist}>
                                        <div>
                                            <div className={styles.albumTitle}>
                                                {playlist.title}
                                            </div>
                                            <div className={styles.albumTime}>
                                                Cập nhật : {d.getDate()}/
                                                {d.getMonth() + 1 > 10
                                                    ? d.getMonth() + 1
                                                    : `0${d.getMonth() + 1}`}
                                                /{d.getFullYear()}
                                            </div>
                                            <div className={styles.albumArtist}>
                                                {artists.map((artist, index) => (
                                                    <Link
                                                        key={index}
                                                        className={
                                                            styles.albumArtistItem
                                                        }
                                                        to={`${artist.link}/${artist.alias}`}
                                                        onClick={() =>
                                                            handleClickLink(
                                                                artist.link,
                                                                "artistdetail"
                                                            )
                                                        }
                                                    >
                                                        {index < artists.length -1 ? `${artist.name},` : `${artist.name}`}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className={styles.albumLike}>
                                                {formatFollow(playlist.like)}{" "}
                                                người yêu thích
                                            </div>
                                        </div>
                                        <div className={styles.albumActions}>
                                            <button className={styles.albumBtn}>
                                                <FontAwesomeIcon
                                                    className={styles.albumIcon}
                                                    icon="fa-solid fa-play"
                                                />
                                                <div>TIẾP TỤC PHÁT</div>
                                            </button>
                                            <div className={styles.albumAction}>
                                                <div
                                                    className={
                                                        styles.albumActionIcon
                                                    }
                                                >
                                                    {" "}
                                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                                </div>
                                                <div
                                                    className={
                                                        styles.albumActionIcon
                                                    }
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={12} lg={9}>
                                <div className={styles.albumScroll}>
                                    <div className={styles.albumDescription}>
                                        <span className={styles.albumPreface}>
                                            Lời tựa{" "}
                                        </span>{" "}
                                        {playlist.sortDescription}{" "}
                                    </div>
                                    <div className={styles.albumTitleBox}>
                                        <div className={styles.albumTitleLeft}>
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-down-wide-short" />
                                            <span
                                                style={{ marginLeft: "10px" }}
                                            >
                                                BÀI HÁT
                                            </span>
                                        </div>
                                        <div
                                            className={styles.albumTitleCenter}
                                        >
                                            ALBUM
                                        </div>
                                        <div className={styles.albumTitleRight}>
                                            THỜI GIAN
                                        </div>
                                    </div>
                                    {songs.map((song, index) => (
                                        <div
                                            key={index}
                                            className={styles.albumWrapper}
                                        >
                                            <div className={styles.albumLeft}>
                                                <div
                                                    className={
                                                        styles.albumIconMusic
                                                    }
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-music" />
                                                </div>
                                                <div
                                                    className={
                                                        styles.albumImagePar
                                                    }
                                                    onClick={() =>
                                                        handleClick({
                                                            encodeId:
                                                                song.encodeId,
                                                            isPlay: true,
                                                            songs: songs,
                                                            index: index,
                                                        })
                                                    }
                                                >
                                                    <img
                                                        className={
                                                            styles.albumImage
                                                        }
                                                        src={song.thumbnail}
                                                        alt=""
                                                    />
                                                    <div
                                                        className={
                                                            styles.albumIconChild
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon="fa-solid fa-play" />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.albumArtistMain
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.albumSongTitle
                                                        }
                                                    >
                                                        {song.title}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.albumSongArtist
                                                        }
                                                    >
                                                        {song.artists !==
                                                            undefined &&
                                                            song.artists.map(
                                                                (
                                                                    artist,
                                                                    index
                                                                ) => (
                                                                    <Link
                                                                        className={
                                                                            styles.albumArtistItem
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        to={`${artist.link}/${artist.alias}`}
                                                                        onClick={() =>
                                                                            handleClickLink(
                                                                                artist.link,
                                                                                "artistdetail"
                                                                            )
                                                                        }
                                                                    >
                                                                        {index >
                                                                        0
                                                                            ? `, ${artist.name}`
                                                                            : artist.name}
                                                                    </Link>
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                className={`${styles.albumCenter} chart-center`}
                                                to={
                                                    song.album !== undefined &&
                                                    song.album.link
                                                }
                                            >
                                                {song.album !== undefined &&
                                                    song.album.title}
                                            </Link>
                                            <div
                                                className={`${styles.albumRight} chart-right`}
                                            >
                                                {formatTime(song.duration)}
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        className="d-flex mt-1 ps-2"
                                        style={{
                                            color: "#ffffff80",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {`${songs.length} bài hát`}
                                        <span className="mx-2">•</span>
                                        <div>{`${Math.floor(
                                            sumDuration / 3600
                                        )} giờ ${Math.floor(
                                            (sumDuration -
                                                Math.floor(sumDuration / 3600) *
                                                    3600) /
                                                60
                                        )} phút`}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {suggestPlaylist.length > 0 &&
                    suggestPlaylist.includes(
                        suggestPlaylist.filter(
                            (item) => item.sectionType === "artist"
                        )[0]
                    ) ? (
                        <Artistjoin suggestPlaylist={suggestPlaylist} />
                    ) : (
                        <></>
                    )}
                    {suggestPlaylist.length > 0 &&
                    suggestPlaylist.includes(
                        suggestPlaylist.filter(
                            (item) => item.sectionType === "playlist"
                        )[0]
                    ) ? (
                        <PlaylistSuggest suggestPlaylist={suggestPlaylist} />
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
}

export default Anbuml;
