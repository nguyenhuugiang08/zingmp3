import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import "scss/responsive.scss";

function Menu() {
  // xử lý close menu
  const handleCloseMenu = () => {
    const overlayElement = document.querySelector(".menu-overlay");
    const menuElement = document.querySelector(".menu");
    overlayElement.style.display = "none";
    menuElement.style.left = "-300px";
  };

  const Item = ({ path, icon, content }) => {
    return (
      <NavItem>
        <Link className="menu-navbar-link" to={path} onClick={handleCloseMenu}>
          <FontAwesomeIcon icon={icon} className="me-3" />
          {content === "Radio" ? (
            <span>
              Radio
              <img
                src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
                alt="logo-live"
                className="ms-2"
              />
            </span>
          ) : (
            <span>{content}</span>
          )}
        </Link>
      </NavItem>
    );
  };

  return (
    <div>
      <div className="menu-overlay" onClick={handleCloseMenu}></div>
      <div className="menu">
        <div className="menu-navbar">
          <Nav pills vertical>
            <div
              className="d-flex justify-content-start align-items-center"
              style={{ paddingLeft: "20px" }}
            >
              <img
                src="https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg"
                alt="avatar"
                className="menu-navbar-logo"
              />
              <div className="ms-3" style={{ color: "#fff" }}>
                Nguyễn Hữu Giang
              </div>
            </div>
            <div className="menu-close" onClick={handleCloseMenu}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
            <Item
              path="personal"
              icon="fa-solid fa-podcast"
              content="Cá Nhân"
            />
            <Item path="/" icon="fa-solid fa-compact-disc" content="Khám Phá" />
            <Item
              path="zingchart"
              icon="fa-solid fa-chart-line"
              content="#Zingchart"
            />
            <Item path="radio" icon="fa-solid fa-radio" content="Radio" />
            <Item
              path="follow"
              icon="fa-solid fa-rectangle-list"
              content="Theo Dõi"
            />
          </Nav>
          <hr />

          <Nav pills vertical>
            <Item
              path="new-music"
              icon="fa-solid fa-music"
              content="Nhạc Mới"
            />
            <Item path="genre" icon="fa-solid fa-icons" content="Thể Loại" />
            <Item path="top100" icon="fa-solid fa-star" content="Top 100" />
            <Item path="MV" icon="fa-solid fa-circle-play" content="MV" />
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
            <Item path="history" icon="fa-regular fa-clock" content="Gần đây" />
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default Menu;
