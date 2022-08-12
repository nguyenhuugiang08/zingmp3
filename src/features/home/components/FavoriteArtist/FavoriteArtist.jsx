import { loadLink } from "features/linkSlice";
import { loadCurrentSong } from "features/top100/top100Slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "scss/favoriteartist.scss";

function FavoriteArtist({ data }) {
  const [favoriteArtist, setFavoriteArtist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setFavoriteArtist(
        data.filter((item) => item.sectionType === "mix")[0].items
      );
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  const handleLoadCurrentSong = (props) => {
    const action = loadCurrentSong(props);
    dispatch(action);
  };

  return (
    <div className="favorite-artist">
      <div className="favorite-artist__title">
        {data.length > 0 &&
          data.filter((item) => item.sectionType === "mix")[0].title}
      </div>
      <Container className="mt-3" fluid>
        <Row xs={2} md={3} xl={4} xxl={5} >
          {favoriteArtist.map((artist, index) => (
            <div className="favorite-artist__card mb-3" key={artist.encodeId}>
              {index >= 5 ? (
                <></>
              ) : (
                <Col>
                  <div>
                    <div className="favorite-artist__card-wrapper">
                      <div
                        className="favorite-artist__card-wrapper-img"
                        style={{ backgroundImage: `url(${artist.thumbnailM})` }}
                        onClick={() =>
                          handleLoadCurrentSong({
                            encodeId: artist.song.items[0].encodeId,
                            isPlay: true,
                            songs: artist.song.items,
                            index: 0,
                          })
                        }
                      ></div>
                    </div>
                    <div className="favorite-artist__card-box">
                      <div className="favorite-artist__card-box__name">
                        {artist.artists[0].name}
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        {artist.song.items.map((song, index) => (
                          <div key={song.encodeId}>
                            {index >= 3 ? (
                              <></>
                            ) : (
                              <div
                                className="favorite-artist__card-box__container me-2"
                                key={song.encodeId}
                              >
                                <Link
                                  to={`${artist.link}/${artist.encodeId}`}
                                  onClick={() =>
                                    handleClickLink(artist.link, "album")
                                  }
                                >
                                  <div
                                    className="favorite-artist__card-box__container-img "
                                    style={{
                                      backgroundImage: `url(${song.thumbnail})`,
                                    }}
                                  ></div>
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default FavoriteArtist;
