import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import followApi from "api/followApi";
import Artist from "features/home/components/ArtistSpotlightType";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import "scss/Follow.scss";
import { Link } from "react-router-dom";
import { loadLink } from "features/linkSlice";
import ReactPlayer from "react-player";
import Masonry from "react-masonry-css";
import Loading from "./Loading";

function Follow() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [id, setId] = useState("IWZ9Z08I");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const homeData = useSelector((state) => state.homeData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFollowData = async () => {
      try {
        const params = {
          id: id,
          page: page,
        };
        if (page === 1) {
          setLoading(true);
        }
        const response = await followApi.getAll(params);
        if (response.data.items) {
          const newList = [...list, ...response.data.items];
          setList(newList);
        }
        if (page === 100) {
          setHasMore(true);
        }
        setLoading(false);
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };

    getFollowData();
  }, [id, page]);

  useEffect(() => {
    if (homeData.length > 0) {
      setData(homeData[0].items);
    }
  }, [homeData]);

  //xử lý lọc theo thể loại nhạc
  const handleFilterType = (e, type) => {
    let filterElement = document.querySelectorAll(".follow-filter__item");
    filterElement.forEach((element) => {
      element.style.backgroundColor = "transparent";
    });
    e.target.style.backgroundColor = "#ffffff4d";
    setId(
      type === "vn"
        ? "IWZ9Z08I"
        : type === "usuk"
        ? "IWZ9Z08O"
        : type === "kpop"
        ? "IWZ9Z08W"
        : "IWZ9Z08U"
    );
    const list = [];
    setList(list);
    setPage(1);
  };

  //xử lý lấy thêm dũ liệu khi scroll hết trang
  const fetchData = () => {
    setPage((prev) => prev + 1);
  };

  //xử ly click chuyển trang artist detail
  const handleArtistDetail = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  // xử lý thời gian đăng bài
  const handleDateTime = (time) => {
    const date = new Date(time * 1000);
    return `${date.getDay()} tháng ${
      date.getMonth() + 1
    } lúc ${date.getHours()}:${date.getMinutes()}`;
  };

  // breakpoints responsive
  const breakpointColumnsObj = {
    default: 3,
    1199: 2,
    739: 1,
  };

  return (
    <div className="follow">
      <div className="follow-filter">
        <div
          className="follow-filter__item follow-filter__item--active"
          onClick={(e) => handleFilterType(e, "vn")}
        >
          VIỆT NAM
        </div>
        <div
          className="follow-filter__item"
          onClick={(e) => handleFilterType(e, "usuk")}
        >
          US-UK
        </div>
        <div
          className="follow-filter__item"
          onClick={(e) => handleFilterType(e, "kpop")}
        >
          K-POP
        </div>
        <div
          className="follow-filter__item"
          onClick={(e) => handleFilterType(e, "cpop")}
        >
          HOA NGỮ
        </div>
        <div
          className="follow-filter__item"
          onClick={(e) => handleFilterType(e, "outstanding")}
        >
          NỔI BẬT
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Artist data={data} />
          <InfiniteScroll
            dataLength={list.length} //This is important field to render the next data
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
            <div className="mt-5">
              <div>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {list.map((item) => (
                    <div key={item.id} className="mb-3">
                      <div className="main">
                        <div className="main__header">
                          <div className="main__header-avatar">
                            <div
                              className="main__header-avatar-thumbnail"
                              style={{
                                backgroundImage: `url(${item.publisher.thumbnail})`,
                              }}
                            ></div>
                          </div>
                          <div>
                            <div className="ms-2 main__header-title">
                              <Link
                                className="main__header-title__artist"
                                to={`${item.publisher.link}/${item.publisher.alias}`}
                                onClick={() =>
                                  handleArtistDetail(
                                    item.publisher.link,
                                    "artistdetail"
                                  )
                                }
                              >
                                {item.publisher.name}
                              </Link>
                              <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                              <span className="main__header-title__care">
                                Quan tâm
                              </span>
                            </div>
                            <div className="ms-2 main__header-time">
                              {handleDateTime(item.publishTime)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 main-title">{item.title}</div>
                        <div className="main-thumbnail mt-2">
                          {item.content.type === "album" ? (
                            <div
                              className="main-thumbnail__item"
                              style={{
                                backgroundImage: `url(${item.content.photos[0].url})`,
                              }}
                            ></div>
                          ) : item.content.type === "feedVideo" ? (
                            <div>
                              <ReactPlayer
                                style={{ borderRadius: "8px" }}
                                url={
                                  item.content.source["144p"] ||
                                  item.content.source["240p"] ||
                                  item.content.source["360p"] ||
                                  item.content.source["480p"] ||
                                  item.content.source["720p"] ||
                                  item.content.source["1080p"]
                                }
                                width={"100%"}
                                height={472}
                                controls={true}
                                playing={false}
                              />
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="main-action">
                          <div className="main-action__like">
                            <FontAwesomeIcon
                              icon="fa-regular fa-heart"
                              className="me-1"
                            />
                            {item.like}
                          </div>
                          <div className="main-action__comment ms-4">
                            <FontAwesomeIcon
                              icon="fa-regular fa-comment"
                              className="me-1"
                            />
                            {item.commend}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </div>
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

export default Follow;
