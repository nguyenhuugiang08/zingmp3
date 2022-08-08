import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import recommendKeywordApi from "api/recommendKeywordApi";
import suggestionKeywordApi from "api/suggestKeywordApi";
import styles from 'scss/Header.module.scss';
import { Button } from "reactstrap";
import ReactLoading from 'react-loading';

function Header() {
    const [loading, setLoading] = useState(false)

    const [recommendKeyword, setRecommendKeyword] = useState([])

    const [suggestionKeyword, setSuggestionKeyword] = useState('')
    const [value] = useDebounce(suggestionKeyword, 300)
    const [suggestionList, setSuggestionList] = useState([])

    const navigate = useNavigate()
    const inputRef = useRef()
    const ulRef = useRef()

    useEffect(() => {
        const getRecommendKeyword = async () => {
            try {
                setLoading(true)
                const response = await recommendKeywordApi.getAll()
                setRecommendKeyword(response.data)
                setLoading(false)
            } catch (error) {
                console.log('falied to fetch to data', error)
            }
        }
        getRecommendKeyword()
    }, [])

    useEffect(() => {
        const getSuggestionkeyword = async () => {
            try {
                const params = {
                    keyword: value
                }
                setLoading(true)
                const response = await suggestionKeywordApi.getAll(params)
                if (Array.isArray(response.data.items)) {
                    setSuggestionList(response.data.items)
                }
                setLoading(false)
            } catch (error) {
                console.log('falied to fetch to data', error)
            }
        }
        getSuggestionkeyword()
    }, [value])

    const handleOnKeyUp = (e) => {
        if (e.which === 13) {
            return navigate(`/tim-kiem/tat-ca?q=${value}`)
        }
    }

    return (
        <>
            <div className={`${styles.header} d-flex header`}>
                <div className="d-flex justify-content-center align-items-center">
                    <div
                        className={`${styles.haederBtn} me-3`}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
                    </div>

                    <div
                        className={styles.haederBtn}
                        onClick={() => navigate(1)}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
                    </div>

                    <div
                        className={styles.headerPadding}
                    >
                        <input
                            className={styles.headerInput}
                            type="text"
                            placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                            ref={inputRef}
                            value={suggestionKeyword}
                            onChange={(e) => setSuggestionKeyword(e.target.value)}
                            onKeyUp={(e) => handleOnKeyUp(e)}
                        />
                        {value ?
                            <ul className={styles.headerRecommendKeyword} ref={ulRef}>
                                <div className={styles.headerSearchTitle}>
                                    Từ khóa liên quan
                                </div>
                                <div
                                    className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                    style={{ padding: '8px 10px', borderRadius: '8px' }}
                                >
                                    <div className={styles.headerRecommendKeywordIcon}>
                                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                    </div>
                                    <li>
                                        Tìm kiếm "{suggestionKeyword}"
                                    </li>
                                </div>
                                {loading ?
                                    <div className='mv-loading-more'>
                                        <ReactLoading type='spin' color='#fff' height={'4%'} width={'4%'} />
                                    </div>
                                    :
                                    suggestionList.map((item, index) => (
                                        <div key={index}>
                                            {index === 0 ?
                                                <div>
                                                    {item.keywords.map((keyword, index) => (
                                                        <div key={index} className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`} style={{ padding: '8px 10px', borderRadius: '8px' }}>
                                                            <div className={styles.headerRecommendKeywordIcon}>
                                                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                                            </div>
                                                            <li>
                                                                {keyword.keyword}
                                                            </li>
                                                        </div>
                                                    ))}

                                                </div>
                                                :
                                                <div style={{ borderTop: '1px solid #ffffff1a', marginTop: '10px', paddingTop: '10px' }}>
                                                    <div className={styles.headerSearchTitle} >
                                                        Gợi ý kết quả
                                                    </div>
                                                    {item.suggestions.map((suggest, index) => (
                                                        <div key={index}
                                                            className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`}
                                                            style={{ padding: '8px 10px', borderRadius: '8px' }}
                                                        >
                                                            <div className={styles.headerSuggestThumbnail}>
                                                                <div className={styles.headerSuggestThumbnailImg}
                                                                    style={{ backgroundImage: `url(${suggest.avatar || suggest.thumb})`, borderRadius: `${suggest.type === 4 ? '50%' : '5px'}` }}></div>
                                                            </div>
                                                            <div className="ms-2">
                                                                <div style={{ fontSize: '14px', fontWeight: '500' }}>{suggest.name || suggest.title}</div>
                                                                {suggest.type === 4 ?
                                                                    <div style={{ fontSize: '13px', color: '#ffffff80' }}>
                                                                        Nghệ sĩ • {suggest.followers / 1000}K quan tâm
                                                                    </div> :
                                                                    (
                                                                        suggest.type === 5 ?
                                                                            <div style={{ fontSize: '13px', color: '#ffffff80' }}>
                                                                                {suggest.hubGroup}
                                                                            </div> :
                                                                            <div className='d-flex justify-content-start align-items-center'>
                                                                                {suggest.artists.map((artist, index) => (
                                                                                    <div
                                                                                        style={{ fontSize: '13px', color: '#ffffff80' }}
                                                                                        key={index}
                                                                                    >
                                                                                        {index < suggest.artists.length - 1 ? <div className="me-1">{artist.name},</div> : `${artist.name}`}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    ))}

                            </ul> :
                            <ul className={styles.headerRecommendKeyword} ref={ulRef}>
                                <div className={styles.headerSearchTitle}>
                                    Đề xuất cho bạn
                                </div>
                                {loading ?
                                    <div className='mv-loading-more'>
                                        <ReactLoading type='spin' color='#fff' height={'4%'} width={'4%'} />
                                    </div> :
                                    <div>
                                        {recommendKeyword.map((item, index) => (
                                            <div key={index} className={`${styles.headerRecommendKeywordItem} d-flex justify-content-start align-items-center`} style={{ padding: '8px 10px', borderRadius: '8px' }}>
                                                <div className={styles.headerRecommendKeywordIcon}>
                                                    <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />
                                                </div>
                                                <li>
                                                    {item.keyword}
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </ul>
                        }
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <div>
                        <Button className={styles.settingItem} >
                            <FontAwesomeIcon icon="fa-solid fa-shirt" />
                        </Button>
                    </div>

                    <div>
                        <a href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=sidebar">
                            <Button className={styles.settingItem}>
                                <FontAwesomeIcon icon="fa-solid fa-gem" />
                            </Button>
                        </a>
                    </div>

                    <div>
                        <Button className={styles.settingItem}>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                        </Button>
                    </div>

                    <div>
                        <Button className={styles.settingItem}>
                            <FontAwesomeIcon icon="fa-solid fa-gear" />
                        </Button>
                    </div>

                    <div className={styles.settingItem}>
                        <img className={styles.settingImage} src="https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg" alt="Avatar" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header