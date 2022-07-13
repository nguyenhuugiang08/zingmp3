import React, { useEffect, useRef, useState } from "react";
import styles from 'scss/Header.module.scss'
import { Navbar, Collapse, Button } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchApi from "api/searchApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const [keyword, setKeyWord] = useState('')
    const [data, setData] = useState({})
    const [id, setId] = useState('')

    const navigate = useNavigate()
    const inputRef = useRef()

    useEffect(() => {
        const getSearch = async () => {
            const params = {
                keyword: keyword
            }
            const response = await searchApi.getAll(params)
            setData(response.data)
        }

        getSearch()
    }, [keyword])

    const handleOnKeyUp = (e) => {
        if(e.which === 13){
            setKeyWord(id)
        }
    }

    return (
        <>
            <div className={`${styles.header} d-flex header`}>
                <div className="d-flex">
                    <Button
                        className={styles.haederBtn}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
                    </Button>

                    <Button
                        className={styles.haederBtn}
                        onClick={() => navigate(1)}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
                    </Button>

                    <Navbar
                        dark
                        expand="sm"
                        light
                        className={styles.headerPadding}
                    >
                        <Collapse navbar>
                        </Collapse>
                        <input
                            className={styles.headerInput}
                            type="text"
                            placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                            ref={inputRef}
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            onKeyUp={(e) => handleOnKeyUp(e)}
                        />
                    </Navbar>
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