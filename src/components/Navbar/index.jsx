import React from 'react'
import { Nav, NavItem, Card, CardBody, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from 'scss/Navbar.module.scss'
import Content from '../pages/Content'

const Item = ({ path, icon, content }) => {
   return (
      <NavItem className={styles.navbarItem}>
         <Link className={styles.navLink} to={path}>
            <FontAwesomeIcon icon={icon} />
            {content === 'Radio' ? <span className={styles.navbarText}>Radio
               <img className={styles.navbarLive} src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/live-tag.svg" alt="" />
            </span> :
               <span className={styles.navbarText}>{content}</span>
            }
         </Link>
      </NavItem>
   )
}

function Navbar() {
   return (
      <div>
         <div className={styles.navbar}>
            <Nav pills vertical>
               <NavItem className={`${styles.navbarItem} ${styles.navbarLogo}`}>
                  <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" className={styles.img} />
               </NavItem>
               <Item path='/personal'
                  icon='fa-solid fa-podcast'
                  content='Cá Nhân'
               />
               <Item path='/'
                  icon='fa-solid fa-compact-disc'
                  content='Khám Phá'
               />
               <Item path='/zingchart'
                  icon='fa-solid fa-chart-line'
                  content='#Zingchart'
               />
               <Item path='/radio'
                  icon='fa-solid fa-radio'
                  content='Radio'
               />
               <Item path='/follow'
                  icon='fa-solid fa-rectangle-list'
                  content='Theo Dõi'
               />
            </Nav>
            <hr />

            <div className={styles.navarScroll}>
               <Nav pills vertical>
                  <Item path='/personal'
                     icon='fa-solid fa-music'
                     content='Nhạc Mới'
                  />
                  <Item path='/genre'
                     icon='fa-solid fa-icons'
                     content='Thể Loại'
                  />
                  <Item path='/top100'
                     icon='fa-solid fa-star'
                     content='Top 100'
                  />
                  <Item path='/MV'
                     icon='fa-solid fa-circle-play'
                     content='MV'
                  />
               </Nav>

               <div style={{ padding: '18px' }}>
                  <Card
                     className={styles.navbarTag}
                  >
                     <CardBody>
                        <CardText>
                           Nghe nhạc không quảng cái cùng kho nhạc VIP
                        </CardText>
                        <a className={styles.navbarVIP} href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=sidebar">NÂNG CẤP VIP</a>
                     </CardBody>
                  </Card>
               </div>

               <div>
                  <div className={styles.navbarLir}>THƯ VIỆN</div>
                  <Nav pills vertical>
                     <Item path='/song'
                        icon='fa-solid fa-record-vinyl'
                        content='Bài hát'
                     />
                      <Item path='/playlist'
                        icon='fa-regular fa-rectangle-list'
                        content='Playlist'
                     />
                      <Item path='/history'
                        icon='fa-regular fa-clock'
                        content='Gần đây'
                     />
                  </Nav>
               </div>
            </div>
            <button className={styles.navbarButton}>
               <FontAwesomeIcon icon="fa-solid fa-plus" />
               <span className={styles.navbarText}>Tạo playlist mới</span>
            </button>
         </div>

         <Content />
      </div>
   )
}

export default Navbar
