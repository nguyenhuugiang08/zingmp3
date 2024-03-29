import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import listMVApi from "api/listMVApi";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import Loading from "./components/Loading";
import PlayMv from "./components/PlayMv/PlayMv";
import "scss/Mv.scss";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import categoryApi from "api/categoryMV";
import { loadCurrentSong } from "app/currentSongSilce";

function MV() {
    const [mvData, setMvData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("IWZ9Z08I");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [encodeId, setEncodeId] = useState("");
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    // call api lấy danh sách bài mv
    useEffect(() => {
        const getList = async () => {
            try {
                const params = {
                    id: id,
                    page: page,
                    count: 15,
                };
                if (page === 1) {
                    setLoading(true);
                }
                const response = await listMVApi.getAll(params);
                if (response.data.items) {
                    const newList = [...mvData, ...response.data.items];
                    setMvData(newList);
                } else {
                    setPage((prev) => prev + 1);
                }
                setHasMore(response.data.hasMore);
                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch data: ", error);
            }
        };

        getList();
    }, [id, page]);
 
    // call api lấy các danh mục mv
    useEffect(() => {
        const getCategoryMv = async () => {
            try {
                const params = {
                    id: id,
                };

                const response = await categoryApi.getAll(params);
                setCategories(response.data.childs);
            } catch (error) {
                console.log("Failed to fetch data: ", error);
            }
        };

        getCategoryMv();
    }, [id]);

    // lấy thêm dữ liệu khi scroll hết trang
    const fetchData = () => {
        setPage((prev) => prev + 1);
    };

    // xử lý khi click vào thể loại mv nhạc để thay đổi content
    const handleFilter = (e, type) => {
        let filterElement = document.querySelectorAll(".wrapper-filter--item");
        filterElement.forEach((element) => {
            element.style.border = "none";
        });
        e.target.style.borderBottom = "2px solid #7200a1";
        setId(
            type === "vn"
                ? "IWZ9Z08I"
                : type === "usuk"
                ? "IWZ9Z08O"
                : type === "kpop"
                ? "IWZ9Z08W"
                : "IWZ9Z086"
        );
        const list = [];
        setMvData(list);
        setPage(1);
    };

    // xử lý gửi encodeId của mv được play
    const handleSendEncodeId = (id) => {
        setEncodeId(id);
        setMounted(true);
        const action = loadCurrentSong({ isPlay: false });
        dispatch(action);
    };

    // xử lý đóng layout play mv
    const handleClosePlayer = () => {
        setMounted(false);
    };

    // xủ lý chuyển trang
    const handleClickLink = (...rest) => {
        const action = loadLink(rest);
        dispatch(action);
    };

    // xử lý thây đổi content khi click vào một danh mục mv
    const handleCLickCategoryItem = (id) => {
        setId(id);
        const list = [];
        setMvData(list);
        setPage(1);
        let categoryElement = document.querySelector(".category");
        categoryElement.classList.toggle("d-none");
    };

    // xử lý ẩn danh mục mv khi click vào một danh mục
    const handleDisplayCategory = () => {
        let categoryElement = document.querySelector(".category");
        categoryElement.classList.toggle("d-none");
    };

    return (
        <div className='mv'>
            <div>
                <div className='wrapper'>
                    <div className='wrapper-filter wrapper-mv'>MV</div>
                    <div
                        className='wrapper-filter wrapper-filter--item wrapper-vn  wrapper--active'
                        onClick={(e) => handleFilter(e, "vn")}
                    >
                        việt nam
                    </div>
                    <div
                        className='wrapper-filter wrapper-filter--item wrapper-usuk '
                        onClick={(e) => handleFilter(e, "usuk")}
                    >
                        us-uk
                    </div>
                    <div
                        className='wrapper-filter wrapper-filter--item wrapper-kpop '
                        onClick={(e) => handleFilter(e, "kpop")}
                    >
                        kpop
                    </div>
                    <div
                        className='wrapper-filter wrapper-filter--item wrapper-concert '
                        onClick={(e) => handleFilter(e, "concert")}
                    >
                        hòa tấu
                    </div>
                </div>
                <div className='mv-filter'>
                    <div
                        className='mv-filter__all me-3'
                        onClick={handleDisplayCategory}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-music ' />
                        <span className='ms-2'>Tất Cả</span>
                    </div>
                    <div className='mv-filter__listen'>
                        <FontAwesomeIcon icon='fa-solid fa-list-ol' />
                        <span className='ms-2'>Nghe Nhiều</span>
                    </div>
                </div>
                <div className='category d-none'>
                    <Container fluid>
                        <Row>
                            <Col
                                xs={12}
                                md={6}
                                lg={4}
                                className='category-wrapper'
                            >
                                <Row>
                                    {categories.map((category) => (
                                        <Col xs={6} key={category.id}>
                                            <div
                                                className='category-wrapper__item'
                                                onClick={() =>
                                                    handleCLickCategoryItem(
                                                        category.id
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <InfiniteScroll
                        dataLength={mvData.length} //This is important field to render the next data
                        next={hasMore && fetchData}
                        hasMore={true}
                        loader={
                            !hasMore ? (
                                <></>
                            ) : (
                                <div className='mv-loading-more'>
                                    <ReactLoading
                                        type='spinningBubbles'
                                        color='#fff'
                                        height={"4%"}
                                        width={"4%"}
                                    />
                                </div>
                            )
                        }
                    >
                        <Container fluid>
                            <Row>
                                {mvData.map((mv) => (
                                    <Col
                                        xs={12}
                                        md={6}
                                        lg={4}
                                        className='mb-4'
                                        key={mv.encodeId}
                                    >
                                        <div className='mv-wrapper'>
                                            <div className='mv-wrapper-first'>
                                                <div
                                                    className='mv-wrapper-first__img'
                                                    style={{
                                                        backgroundImage: `url(${mv.thumbnailM})`,
                                                    }}
                                                ></div>
                                                <div
                                                    className='mv-wrapper-first__icon'
                                                    onClick={() =>
                                                        handleSendEncodeId(
                                                            mv.encodeId
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon icon='fa-solid fa-play' />
                                                </div>
                                            </div>
                                            <div className='mv-wrapper-second mt-2'>
                                                <div className='mv-wrapper-second__img'>
                                                    <div
                                                        className='mv-wrapper-second__img-thumbnail'
                                                        style={{
                                                            backgroundImage: `url(${mv.artists[0].thumbnail})`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className='ms-3'>
                                                    <div>{mv.title}</div>
                                                    <div className='mv-wrapper-second__artist'>
                                                        {mv.artists.map(
                                                            (artist, index) => (
                                                                <Link
                                                                    to={`${artist.link}/${artist.alias}`}
                                                                    onClick={() =>
                                                                        handleClickLink(
                                                                            artist.link,
                                                                            "artistdetail"
                                                                        )
                                                                    }
                                                                    key={
                                                                        artist.id
                                                                    }
                                                                    className='me-1 mv-wrapper-second__artist-link'
                                                                >
                                                                    {index > 0
                                                                        ? `${artist.name}`
                                                                        : `${artist.name},`}
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </InfiniteScroll>
                )}
            </div>
            {!mounted ? (
                <></>
            ) : (
                <div>
                    <div
                        className='playmv-container-header__icon'
                        onClick={handleClosePlayer}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-xmark' />
                    </div>
                    <PlayMv encodeId={encodeId} />
                </div>
            )}
        </div>
    );
}

export default MV;
