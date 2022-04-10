import React from "react";
import styles from 'scss/Header.module.scss'
import { Navbar, Input, Collapse, Button } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
    return (
        <>
            <div className={`${styles.header} d-flex `}>
                <div className="d-flex">
                    <Button className={styles.haederBtn}>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
                    </Button>

                    <Button className={styles.haederBtn}>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
                    </Button>

                    <Navbar
                        dark
                        expand="sm"
                        light
                        className={styles.headerPadding}
                    >
                        <Collapse navbar>
                            <Input className={styles.navbarInput} type="Search" placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..." />
                        </Collapse>
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