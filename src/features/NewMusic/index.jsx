import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { loadCurrentSong } from "app/currentSongSilce";
import { useDispatch } from "react-redux";
import { loadLink } from "app/linkSlice";
import releaseChartApi from "api/releaseChartApi";
import styles from "scss/Album.module.scss";
import Loading from "./Loading";
import formatTime from "utils/formatTime";
import "scss/responsive.scss";

function NewMusic() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReleaseData = async () => {
      try {
        setLoading(true);
        const response = await releaseChartApi.getAll();
        setData(response.data.items);
        setLoading(false);
      } catch (error) {
        console.log("falied to fetch data", error);
      }
    };
    getReleaseData();
  }, []);

  const dispatch = useDispatch();

  //xử lý load bài hát khi ấn vào thumbnail bài hát
  const handleClick = (props) => {
    const action = loadCurrentSong(props);
    dispatch(action);
  };

  //xử lý chuyển trang artist detail
  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={`${styles.Album} new-music`}>
      <div style={{ fontSize: "42px", fontWeight: "700" }} className="mb-3 new-music-title">
        Nhạc Mới
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row>
            <Col xs={12}>
              <div>
                {data.map((song, index) => (
                  <div
                    key={index}
                    className={`${styles.albumWrapper}`}
                    style={{ flex: "1" }}
                  >
                    <div className={`${styles.albumLeft} chart-left`}>
                      <div
                        className={`zingchart_count chart-left-count ${
                          index === 0
                            ? "zingchart_count--active_one"
                            : index === 1
                            ? "zingchart_count--active_two"
                            : index === 2
                            ? "zingchart_count--active_three"
                            : ""
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="chart-left-rank">
                        {song.rakingStatus === 0 ? (
                          <FontAwesomeIcon icon="fa-solid fa-minus" />
                        ) : song.rakingStatus > 0 ? (
                          <div className="zingchart_raking">
                            <FontAwesomeIcon
                              icon="fa-solid fa-caret-up"
                              style={{ color: "#1dc186" }}
                            />{" "}
                            {song.rakingStatus}
                          </div>
                        ) : (
                          <div className="zingchart_raking">
                            <FontAwesomeIcon
                              icon="fa-solid fa-caret-down"
                              style={{ color: "#e35050" }}
                            />{" "}
                            {song.rakingStatus * -1}
                          </div>
                        )}
                      </div>
                      <div
                        className={styles.albumImagePar}
                        onClick={() =>
                          handleClick({
                            encodeId: song.encodeId,
                            isPlay: true,
                            songs: data,
                            index: index,
                          })
                        }
                      >
                        <img
                          className={styles.albumImage}
                          src={song.thumbnail}
                          alt=""
                        />
                        <div className={styles.albumIconChild}>
                          <FontAwesomeIcon icon="fa-solid fa-play" />
                        </div>
                      </div>
                      <div className={styles.albumArtistMain}>
                        <div>{song.title}</div>
                        <div className={styles.albumSongArtist}>
                          {song.artists !== undefined &&
                            song.artists.map((artist, index) => (
                              <Link
                                className={styles.albumArtistItem}
                                key={index}
                                to={`${artist.link}/${artist.alias}`}
                                onClick={() =>
                                  handleClickLink(artist.link, "artistdetail")
                                }
                              >
                                {index > 0 ? `, ${artist.name}` : artist.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                    <Link
                      className={`${styles.albumCenter} chart-center`}
                      to={song.album !== undefined && song.album.link}
                    >
                      {song.album !== undefined && song.album.title}
                    </Link>
                    <div className={`${styles.albumRight} chart-right`}>
                      {formatTime(song.duration)}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default NewMusic;
