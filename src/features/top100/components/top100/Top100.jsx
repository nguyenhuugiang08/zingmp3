import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import top100Api from 'api/top100Api'
import { loadLink } from 'features/linkSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Nav, NavItem, Row } from 'reactstrap'
import styles from 'scss/Top100.module.scss'
import Loading from './Loading'

function Top100() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const getTop100 = async () => {
      try {
        setLoading(true)
        const response = await top100Api.getAll()
        setList(response.data)
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }
    getTop100()
  }, [])

  const handleClickLink = (...rest) => {
    const action = loadLink(rest)
    dispatch(action)
  }

  const handleClickNameArtist = (...rest) => {
    const action = loadLink(rest)
    dispatch(action)
  }

  const ShowList = () => {
    return (
      <div className={styles.top100}>
        <div className={styles.top100Banner}>
          <img src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.6.17/static/media/banner-100.33cafe6b.png" alt="" />
        </div>
        {list.map((item, index) => (
          <div key={index}>
            <div className={styles.top100Tiltle}>{item.title}</div>
            <div className={styles.top100Container}>
              <Container>
                <Row xs={5}>
                  {item.items.map((compo, index) => (
                    <div key={index}>
                      {index >= 5 ? <></> :
                        <Col className={styles.top100Col}>
                          <div className={styles.top100Par}>
                            <div className={styles.top100Image} style={{ backgroundImage: `url(${compo.thumbnail})` }}>
                            </div>
                            <div className={styles.top100Child}>
                              <div>
                                <FontAwesomeIcon icon="fa-regular fa-heart" />
                              </div>
                              <Link
                                className={styles.top100Play}
                                to={`${compo.link}/${compo.encodeId}`}
                                onClick={() => handleClickLink(compo.link, 'album')}
                              >
                                <FontAwesomeIcon icon="fa-solid fa-play" />
                              </Link>
                              <div>
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                              </div>
                            </div>
                          </div>
                          <div className={styles.top100Title}>
                            {compo.title}
                          </div>
                          <div>
                            <Nav>
                              {compo.artists.map((artist, index) => (
                                <div key={index} className={styles.top100Artist}>
                                  <NavItem>
                                    <Link
                                      to={`${artist.link}/${artist.alias}`}
                                      className={styles.top100ArtistItem}
                                      onClick={() => handleClickNameArtist(artist.link, 'artistdetail')}
                                    >
                                      {artist.name},
                                    </Link>
                                  </NavItem>
                                </div>
                              ))}
                            </Nav>
                          </div>
                        </Col>
                      }
                    </div>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {loading ? <Loading /> : <ShowList />}
    </div>
  )
}

export default Top100