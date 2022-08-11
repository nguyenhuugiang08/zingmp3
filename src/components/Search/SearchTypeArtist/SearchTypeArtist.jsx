import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchTypeApi from "api/searchTypeApi";
import { loadLink } from "features/linkSlice";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import style from "scss/Top100Outstanding.module.scss";
import ReactLoading from "react-loading";
import formatFollow from "utils/formatFollow";
import Loading from "./loading";

function SearchTypeArtist({ keyword, type }) {
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getDataSearchByType = async () => {
      try {
        const params = {
          keyword: keyword,
          type: type,
          page: page,
        };
        if (page === 1) {
          setLoading(true);
        }
        const response = await searchTypeApi.getAll(params);
        if (response.data.items) {
          const newList = [...data, ...response.data.items];
          setData(newList);
        } else {
          setHasMore(true);
        }
        if (response.data) setLoading(false);
      } catch (error) {
        console.log("falied to fetch data", error);
      }
    };
    getDataSearchByType();
  }, [page]);

  const fetchData = () => {
    setPage((prev) => prev + 1);
  };

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };
  return (
    <div className={`${style.top100Outstanding}`}>
      <div className={style.mainTitle}>
        <div className={style.top100OutstandingTiltle}>Nghệ Sĩ/OA</div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={!hasMore && fetchData}
          hasMore={true}
          loader={
            hasMore ? (
              <></>
            ) : (
              <div className="mv-loading-more">
                <ReactLoading
                  type="spinningBubbles"
                  color="#fff"
                  height={"4%"}
                  width={"4%"}
                />
              </div>
            )
          }
        >
          <div>
            <div className={style.top100OutstandingContainer}>
              <Container>
                <Row xs={5}>
                  {data.map((artist, index) => (
                    <div key={index}>
                      <Col className={style.top100OutstandingCol}>
                        <div
                          className={style.top100OutstandingPar}
                          style={{ borderRadius: "50%" }}
                        >
                          <div
                            className={style.top100OutstandingImage}
                            style={{
                              backgroundImage: `url(${artist.thumbnail})`,
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div className={style.top100OutstandingChild}>
                            <div>
                              <FontAwesomeIcon icon="fa-regular fa-heart" />
                            </div>
                            <Link
                              className={style.top100OutstandingPlay}
                              to={`${artist.link}/${artist.alias}`}
                              onClick={() =>
                                handleClickLink(artist.link, "artistdetail")
                              }
                            >
                              <FontAwesomeIcon icon="fa-solid fa-play" />
                            </Link>
                            <div>
                              <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                          <div className={style.top100OutstandingTitle}>
                            {artist.name}
                          </div>
                          <div>{formatFollow(artist.totalFollow)}</div>
                        </div>
                      </Col>
                    </div>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default SearchTypeArtist;
