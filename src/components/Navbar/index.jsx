import React, { useEffect, useState } from "react";
import { Nav, NavItem, Card, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "scss/Navbar.module.scss";
import "scss/responsive.scss";
import { useSelector } from "react-redux";

const Item = ({ path, icon, content }) => {
  return (
    <NavItem className={styles.navbarItem}>
      <Link className={styles.navLink} to={path}>
        <FontAwesomeIcon icon={icon} />
        {content === "Radio" ? (
          <span className={styles.navbarText}>
            Radio
            <img
              className={styles.navbarLive}
              src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
              alt=""
            />
          </span>
        ) : (
          <span className={styles.navbarText}>{content}</span>
        )}
      </Link>
    </NavItem>
  );
};

function Navbar() {
  const dataStore = useSelector((state) => state.currentSong);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (dataStore.length !== 0) {
      setMounted(dataStore[dataStore.length - 1].isPlay);
    }
  }, [dataStore]);
  return (
    <div>
      <div
        className={`${styles.navbar} navbar-no-responsive`}
        style={{ bottom: `${mounted ? "90px" : ""}` }}
      >
        <Nav pills vertical>
          <Link className={`${styles.navbarItem} ${styles.navbarLogo}`} to="/">
            <img
              src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
              alt=""
              className={styles.navbarImg}
            />
          </Link>
          <Item path="personal" icon="fa-solid fa-podcast" content="Cá Nhân" />
          <Item path="/" icon="fa-solid fa-compact-disc" content="Khám Phá" />
          <Item
            path="zingchart"
            icon="fa-solid fa-chart-line"
            content="#Zingchart"
          />
          <Item path="radio" icon="fa-solid fa-radio" content="Radio" />
          <Item
            path="the-loai-nghe-si"
            icon="fa-solid fa-rectangle-list"
            content="Theo Dõi"
          />
        </Nav>
        <hr />

        <div className={styles.navarScroll}>
          <Nav pills vertical>
            <Item
              path="new-music"
              icon="fa-solid fa-music"
              content="Nhạc Mới"
            />
            <Item path="genre" icon="fa-solid fa-icons" content="Thể Loại" />
            <Item path="top100" icon="fa-solid fa-star" content="Top 100" />
            <Item path="MV" icon="fa-solid fa-circle-play" content="MV" />
          </Nav>

          <div style={{ padding: "18px" }}>
            <Card className={styles.navbarTag}>
              <CardBody>
                <CardText>Nghe nhạc không quảng cái cùng kho nhạc VIP</CardText>
                <a
                  className={styles.navbarVIP}
                  href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=sidebar"
                >
                  NÂNG CẤP VIP
                </a>
              </CardBody>
            </Card>
          </div>

          <div>
            <div className={styles.navbarLir}>THƯ VIỆN</div>
            <Nav pills vertical>
              <Item
                path="song"
                icon="fa-solid fa-record-vinyl"
                content="Bài hát"
              />
              <Item
                path="playlist"
                icon="fa-regular fa-rectangle-list"
                content="Playlist"
              />
              <Item
                path="history"
                icon="fa-regular fa-clock"
                content="Gần đây"
              />
            </Nav>
          </div>
        </div>
        <button className={styles.navbarButton}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
          <span className={styles.navbarText}>Tạo playlist mới</span>
        </button>
      </div>
      <div
        className={`${styles.navbar} navbar-responsive`}
        style={{ bottom: `${mounted ? "90px" : ""}` }}
      >
        <Nav pills vertical>
          <Link className={`${styles.navbarItem} navbar-item`} to="/">
            <img
              src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.24/static/media/icon_zing_mp3_60.f6b51045.svg"
              alt=""
              className="navbar-logo"
            />
          </Link>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"personal"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-podcast"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"/"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-compact-disc"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"zingchart"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-chart-line"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"radio"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-radio"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"follow"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-rectangle-list"
              />
            </Link>
          </NavItem>
        </Nav>
        <hr />
        <Nav pills vertical>
          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"new-music"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-music"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"genre"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-icons"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"top100"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="fa-solid fa-star"
              />
            </Link>
          </NavItem>

          <NavItem className={`${styles.navbarItem} navbar-item`}>
            <Link className={styles.navLink} to={"MV"}>
              <FontAwesomeIcon
                className="navbar-icon"
                icon="a-solid fa-circle-play"
              />
            </Link>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}

export default Navbar;
