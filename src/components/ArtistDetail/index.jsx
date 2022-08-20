import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import artistApi from "api/artistApi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { loadCurrentSong } from "app/currentSongSilce";
import SongType from "./components/SongType/SongType";
import VideoType from "./components/VideoType/VideoType";
import ArtistType from "./components/ArtistType/ArtistType";
import PlaylistType from "./components/PlaylistType/PlaylistType";
import Loading from "./Loading";
import formatFollow from "utils/formatFollow";
import "scss/ArtistDetail.scss";

function ArtistDetail() {
  const { encodeId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getInfoArtist = async () => {
      const params = {
        name: encodeId,
      };
      setLoading(true);
      const response = await artistApi.getAll(params);
      setData(response.data);
      setLoading(false);
    };
    getInfoArtist();
  }, [encodeId]);

  const handleClick = (props) => {
    const action = loadCurrentSong(props);
    dispatch(action);
  };

  let index = Math.floor(
    Math.random() *
      (data.sections &&
        data.sections.length > 0 &&
        data.sections[0].items.length)
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="main">
          <div className="Artist-blur"></div>
          <div
            className="Artist-thumbnail"
            style={{ backgroundImage: `url(${data.thumbnail})` }}
          ></div>
          <div className="Artist-detail">
            <Container>
              <Row>
                <Col xs={12} md={7}>
                  <div className="Artist-detail__name">{data.name}</div>
                  <div className="Artist-detail__biography">
                    {data.biography || data.sortBiography}
                  </div>
                  <div className="Artist-detail__more">XEM THÊM</div>
                  <div className="d-flex justify-content-start align-items-center mt-4">
                    <div
                      className="Artist-detail__play"
                      onClick={() =>
                        handleClick({
                          encodeId:
                            data.sections &&
                            data.sections.length > 0 &&
                            data.sections[0].items[index].encodeId,
                          isPlay: true,
                          songs:
                            data.sections &&
                            data.sections.length > 0 &&
                            data.sections[0].items,
                          index: index,
                        })
                      }
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-play"
                        className="me-2"
                      />
                      PHÁT NHẠC
                    </div>
                    <div className="ms-3 Artist-detail__care">
                      QUAN TÂM <span className="mx-1">•</span>{" "}
                      {formatFollow(data.totalFollow)}
                    </div>
                  </div>
                  <div>
                    <i class="icon ic-zing-choice"></i>
                  </div>
                </Col>
                <Col xs={12} md={5}>
                  <div className="d-flex justify-content-end">
                    <img
                      className="Artist-detail__img"
                      src={data.thumbnail}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="Artist-detail__filter ">
                  <div className="Artist-detail__filter-wrapper d-flex justify-content-start align-items-center">
                    <div className="Artist-detail__filter-wrapper-cate Artist-detail__filter-wrapper-cate--active">
                      TỔNG QUAN
                    </div>
                    <div className="Artist-detail__filter-wrapper-cate">
                      HOẠT ĐỘNG
                    </div>
                    <div className="Artist-detail__filter-wrapper-cate">
                      SỰ KIỆN
                    </div>
                    <div className="Artist-detail__filter-wrapper-cate">
                      BÀI HÁT
                    </div>
                    <div className="Artist-detail__filter-wrapper-cate">
                      SINGLE {"&"} EP
                    </div>
                    <div className="Artist-detail__filter-wrapper-cate">
                      ALBUM
                    </div>
                    <div className="Artist-detail__filter-wrapper-cate">MV</div>
                  </div>
                </div>
              </Row>
              {data.sections &&
              data.sections.includes(
                data.sections.filter((item) => item.sectionType === "song")[0]
              ) ? (
                <SongType data={data}/>
              ) : (
                <></>
              )}
              {data.sections &&
              data.sections.includes(
                data.sections.filter((item) => item.sectionType === "video")[0]
              ) ? (
                <VideoType data={data}/>
              ) : (
                <></>
              )}
              {data.sections &&
              data.sections.includes(
                data.sections.filter(
                  (item) => item.sectionType === "playlist"
                )[0]
              ) ? (
                <PlaylistType data={data}/>
              ) : (
                <></>
              )}
              {data.sections &&
              data.sections.includes(
                data.sections.filter((item) => item.sectionType === "artist")[0]
              ) ? (
                <ArtistType data={data}/>
              ) : (
                <></>
              )}
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistDetail;
