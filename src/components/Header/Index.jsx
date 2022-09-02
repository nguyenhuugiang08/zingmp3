import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import recommendKeywordApi from "api/recommendKeywordApi";
import suggestionKeywordApi from "api/suggestKeywordApi";
import styles from "scss/Header.module.scss";
import { Button } from "reactstrap";
import ReactLoading from "react-loading";
import formatFollow from "utils/formatFollow";
import Menu from "./components/Menu";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";
import { loadCurrentSong } from "app/currentSongSilce";

function Header() {
    const [loading, setLoading] = useState(false);

    const [recommendKeyword, setRecommendKeyword] = useState([]);

    const [suggestionKeyword, setSuggestionKeyword] = useState(
        localStorage.getItem("historySearch") ?? ""
    );
    const [value] = useDebounce(suggestionKeyword, 300);
    const [suggestionList, setSuggestionList] = useState([]);

    const navigate = useNavigate();
    const inputRef = useRef();
    const ulRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        const getRecommendKeyword = async () => {
            try {
                setLoading(true);
                const response = await recommendKeywordApi.getAll();
                setRecommendKeyword(response.data);
                setLoading(false);
            } catch (error) {
                console.log("falied to fetch to data", error);
            }
        };
        getRecommendKeyword();
    }, []);

    useEffect(() => {
        const getSuggestionkeyword = async () => {
            try {
                const params = {
                    keyword: value,
                };
                setLoading(true);
                const response = await suggestionKeywordApi.getAll(params);
                if (Array.isArray(response.data.items)) {
                    setSuggestionList(response.data.items);
                }
                setLoading(false);
            } catch (error) {
                console.log("falied to fetch to data", error);
            }
        };
        getSuggestionkeyword();
    }, [value]);

    const handleOnKeyUp = (e) => {
        if (e.which === 13 && suggestionKeyword !== "") {
            ulRef.current.style.display = "none";
            inputRef.current.blur();
            inputRef.current.style.backgroundColor = "#2f2739";
            inputRef.current.style.borderTopLeftRadius = "20px";
            inputRef.current.style.borderTopRightRadius = "20px";
            inputRef.current.style.borderBottomLeftRadius = "20px";
            inputRef.current.style.borderBottomRightRadius = "20px";
            localStorage.setItem("historySearch", suggestionKeyword || []);
            return navigate(`/tim-kiem/tat-ca?q=${suggestionKeyword}`);
        }
    };

    //xử lý khi ấn vào từ khóa gợi ý trên ô search
    const handleClickRecommendKeyWord = (keyword) => {
        setSuggestionKeyword(keyword);
        ulRef.current.style.display = "none";
        inputRef.current.style.backgroundColor = "#2f2739";
        inputRef.current.style.borderTopLeftRadius = "20px";
        inputRef.current.style.borderTopRightRadius = "20px";
        inputRef.current.style.borderBottomLeftRadius = "20px";
        inputRef.current.style.borderBottomRightRadius = "20px";
        localStorage.setItem("historySearch", keyword || []);
        return navigate(`/tim-kiem/tat-ca?q=${keyword}`);
    };

    //xử lý khi focus input
    const handleFocusInput = () => {
        ulRef.current.style.display = "block";
        inputRef.current.style.backgroundColor = "#432275";
        inputRef.current.style.borderTopLeftRadius = "20px";
        inputRef.current.style.borderTopRightRadius = "20px";
        inputRef.current.style.borderBottomLeftRadius = "0";
        inputRef.current.style.borderBottomRightRadius = "0";
    };

    //xử lý khi blur input
    const handleBlurInput = () => {
        setTimeout(() => {
            ulRef.current.style.display = "none";
            inputRef.current.style.backgroundColor = "#2f2739";
            inputRef.current.style.borderTopLeftRadius = "20px";
            inputRef.current.style.borderTopRightRadius = "20px";
            inputRef.current.style.borderBottomLeftRadius = "20px";
            inputRef.current.style.borderBottomRightRadius = "20px";
        }, 200);
    };

    // xử lý hiện menu navbar trên moblie
    const handleDisplayMenuNavbar = () => {
        const overlayElement = document.querySelector(".menu-overlay");
        const menuElement = document.querySelector(".menu");
        overlayElement.style.display = "block";
        menuElement.style.left = "0";
    };

    //xử lý click kết quả gợi ý
    const handleClickSuggestionReslut = (type, ...rest) => {
        if (type !== 1) {
            const action = loadLink(rest);
            dispatch(action);
        }
    };

    // xử lý click kết quả gợi ý là bài hát
    const handleClickSongSuggestion = (props) => {
        const action = loadCurrentSong(props);
        dispatch(action);
    };
    return (
        <>
            <div className={`${styles.header} d-flex header`}>
                <div
                    className='d-flex align-items-center'
                    style={{ flex: "1" }}
                >
                    <div className={`${styles.headerMenu} header-menu`}>
                        <div>
                            <FontAwesomeIcon
                                className={`${styles.headerBtn} me-3`}
                                icon='fa-solid fa-bars'
                                style={{ position: "relative", top: "1px" }}
                                onClick={handleDisplayMenuNavbar}
                            />
                        </div>
                        <Menu />
                    </div>
                    <div
                        className='header-navigate'
                        style={{ maxWidth: "74px" }}
                    >
                        <div
                            className={`${styles.headerBtn} me-3`}
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon icon='fa-solid fa-arrow-left-long' />
                        </div>

                        <div
                            className={`${styles.headerBtn} me-3`}
                            onClick={() => navigate(1)}
                        >
                            <FontAwesomeIcon icon='fa-solid fa-arrow-right-long' />
                        </div>
                    </div>

                    <div className={styles.headerPadding}>
                        <input
                            className={styles.headerInput}
                            type='text'
                            placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'
                            ref={inputRef}
                            value={suggestionKeyword}
                            onChange={(e) =>
                                setSuggestionKeyword(e.target.value)
                            }
                            onKeyUp={(e) => handleOnKeyUp(e)}
                            onFocus={handleFocusInput}
                            onBlur={handleBlurInput}
                        />
                        {value ? (
                            <ul
                                className={styles.headerRecommendKeyword}
                                ref={ulRef}
                            >
                                <div
                                    className={
                                        styles.headerRecommendKeywordListItem
                                    }
                                >
                                    <div className={styles.headerSearchTitle}>
                                        Từ khóa liên quan
                                    </div>
                                    <div
                                        className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                        style={{
                                            padding: "8px 10px",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        <div
                                            className={
                                                styles.headerRecommendKeywordIcon
                                            }
                                        >
                                            <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
                                        </div>
                                        <li>Tìm kiếm "{suggestionKeyword}"</li>
                                    </div>
                                    {loading ? (
                                        <div className='mv-loading-more'>
                                            <ReactLoading
                                                type='spin'
                                                color='#fff'
                                                height={"4%"}
                                                width={"4%"}
                                            />
                                        </div>
                                    ) : (
                                        suggestionList.map((item, index) => (
                                            <div key={index}>
                                                {index === 0 ? (
                                                    <div>
                                                        {item.keywords.map(
                                                            (
                                                                keyword,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                                                    style={{
                                                                        padding:
                                                                            "8px 10px",
                                                                        borderRadius:
                                                                            "8px",
                                                                    }}
                                                                    onClick={() =>
                                                                        handleClickRecommendKeyWord(
                                                                            keyword.keyword
                                                                        )
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.headerRecommendKeywordIcon
                                                                        }
                                                                    >
                                                                        <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
                                                                    </div>
                                                                    <li>
                                                                        {
                                                                            keyword.keyword
                                                                        }
                                                                    </li>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            borderTop:
                                                                "1px solid #ffffff1a",
                                                            marginTop: "10px",
                                                            paddingTop: "10px",
                                                        }}
                                                    >
                                                        <div
                                                            className={
                                                                styles.headerSearchTitle
                                                            }
                                                        >
                                                            Gợi ý kết quả
                                                        </div>
                                                        {item.suggestions.map(
                                                            (suggest) =>
                                                                suggest.type ===
                                                                1 ? (
                                                                    <div
                                                                        key={
                                                                            suggest.id
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                                                            style={{
                                                                                padding:
                                                                                    "8px 10px",
                                                                                borderRadius:
                                                                                    "8px",
                                                                            }}
                                                                            onClick={() =>
                                                                                handleClickSongSuggestion(
                                                                                    {
                                                                                        encodeId:
                                                                                            suggest.id,
                                                                                        isPlay: true,
                                                                                        songs: item.suggestions.filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                item.type ===
                                                                                                1
                                                                                        ),
                                                                                        index: item.suggestions
                                                                                            .filter(
                                                                                                (
                                                                                                    item
                                                                                                ) =>
                                                                                                    item.type ===
                                                                                                    1
                                                                                            )
                                                                                            .indexOf(
                                                                                                item.suggestions.find(
                                                                                                    (
                                                                                                        item
                                                                                                    ) =>
                                                                                                        item.id ===
                                                                                                        suggest.id
                                                                                                )
                                                                                            ),
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    styles.headerSuggestThumbnail
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className={
                                                                                        styles.headerSuggestThumbnailImg
                                                                                    }
                                                                                    style={{
                                                                                        backgroundImage: `url(${
                                                                                            suggest.avatar ||
                                                                                            suggest.thumb
                                                                                        })`,
                                                                                        borderRadius: `${
                                                                                            suggest.type ===
                                                                                            4
                                                                                                ? "50%"
                                                                                                : "5px"
                                                                                        }`,
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                            <div className='ms-2'>
                                                                                <div
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "14px",
                                                                                        fontWeight:
                                                                                            "500",
                                                                                    }}
                                                                                >
                                                                                    {suggest.name ||
                                                                                        suggest.title}
                                                                                </div>
                                                                                <div className='d-flex justify-content-start align-items-center'>
                                                                                    {suggest.artists.map(
                                                                                        (
                                                                                            artist,
                                                                                            index
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className={`${styles.headerArtistLink}`}
                                                                                            >
                                                                                                {index <
                                                                                                suggest
                                                                                                    .artists
                                                                                                    .length -
                                                                                                    1 ? (
                                                                                                    <div className='me-1'>
                                                                                                        {
                                                                                                            artist.name
                                                                                                        }

                                                                                                        ,
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    `${artist.name}`
                                                                                                )}
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <Link
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                                                        style={{
                                                                            padding:
                                                                                "8px 10px",
                                                                            borderRadius:
                                                                                "8px",
                                                                        }}
                                                                        to={
                                                                            suggest.type ===
                                                                            4
                                                                                ? `${
                                                                                      suggest.link ||
                                                                                      ""
                                                                                  }/${
                                                                                      suggest.aliasName
                                                                                  }`
                                                                                : `${
                                                                                      suggest.link &&
                                                                                      suggest.link.slice(
                                                                                          18
                                                                                      )
                                                                                  }/${
                                                                                      suggest.id
                                                                                  }`
                                                                        }
                                                                        onClick={() =>
                                                                            suggest.type ===
                                                                            4
                                                                                ? handleClickSuggestionReslut(
                                                                                      suggest.type,
                                                                                      suggest.link ||
                                                                                          "",
                                                                                      "artistdetail"
                                                                                  )
                                                                                : handleClickSuggestionReslut(
                                                                                      suggest.type,
                                                                                      suggest.link.slice(
                                                                                          18
                                                                                      ),
                                                                                      "nationdetail"
                                                                                  )
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                styles.headerSuggestThumbnail
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    styles.headerSuggestThumbnailImg
                                                                                }
                                                                                style={{
                                                                                    backgroundImage: `url(${
                                                                                        suggest.avatar ||
                                                                                        suggest.thumb
                                                                                    })`,
                                                                                    borderRadius: `${
                                                                                        suggest.type ===
                                                                                        4
                                                                                            ? "50%"
                                                                                            : "5px"
                                                                                    }`,
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                        <div className='ms-2'>
                                                                            <div
                                                                                style={{
                                                                                    fontSize:
                                                                                        "14px",
                                                                                    fontWeight:
                                                                                        "500",
                                                                                }}
                                                                            >
                                                                                {suggest.name ||
                                                                                    suggest.title}
                                                                            </div>
                                                                            {suggest.type ===
                                                                            4 ? (
                                                                                <div
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "13px",
                                                                                        color: "#ffffff80",
                                                                                    }}
                                                                                >
                                                                                    Nghệ
                                                                                    sĩ
                                                                                    •{" "}
                                                                                    {formatFollow(
                                                                                        suggest.followers
                                                                                    )}{" "}
                                                                                    quan
                                                                                    tâm
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "13px",
                                                                                        color: "#ffffff80",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        suggest.hubGroup
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </ul>
                        ) : (
                            <ul
                                className={styles.headerRecommendKeyword}
                                ref={ulRef}
                            >
                                <div className={styles.headerSearchTitle}>
                                    Đề xuất cho bạn
                                </div>
                                {loading ? (
                                    <div className='mv-loading-more'>
                                        <ReactLoading
                                            type='spin'
                                            color='#fff'
                                            height={"4%"}
                                            width={"4%"}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        {recommendKeyword.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                                style={{
                                                    padding: "8px 10px",
                                                    borderRadius: "8px",
                                                }}
                                                onClick={() =>
                                                    handleClickRecommendKeyWord(
                                                        item.keyword
                                                    )
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.headerRecommendKeywordIcon
                                                    }
                                                >
                                                    <FontAwesomeIcon icon='fa-solid fa-arrow-trend-up' />
                                                </div>
                                                <li>{item.keyword}</li>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={`${styles.headerRight} header-right`}>
                    <div className='header-btn'>
                        <Button className={styles.settingItem}>
                            <FontAwesomeIcon icon='fa-solid fa-shirt' />
                        </Button>
                    </div>

                    <div className='header-btn-vip'>
                        <a href='https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=sidebar'>
                            <Button className={styles.settingItem}>
                                <FontAwesomeIcon icon='fa-solid fa-gem' />
                            </Button>
                        </a>
                    </div>

                    <div className='header-btn-upload'>
                        <Button className={styles.settingItem}>
                            <FontAwesomeIcon icon='fa-solid fa-arrow-up-from-bracket' />
                        </Button>
                    </div>

                    <div className='header-btn-setting'>
                        <Button className={styles.settingItem}>
                            <FontAwesomeIcon icon='fa-solid fa-gear' />
                        </Button>
                    </div>

                    <div className='header-btn-avatar'>
                        <img
                            className={styles.settingImage}
                            src='https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg'
                            alt='Avatar'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
