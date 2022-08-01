import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadLink } from 'features/linkSlice'
import { loadCurrentSong } from 'features/top100/top100Slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import styles from 'scss/Album.module.scss'
import 'scss/zingchart.scss'

function Chartdetail() {
  const { encodeId } = useParams()
  const [vn, setVn] = useState([])
  const [usuk, setUsuk] = useState([])
  const [korea, setKorea] = useState([])
  const dispatch = useDispatch()

  const zingchartData = useSelector(state => state.zingchartData)

  useEffect(() => {
    if (zingchartData.length > 0) {
      setVn(zingchartData[0].weekChart.vn.items)
      setUsuk(zingchartData[0].weekChart.us.items)
      setKorea(zingchartData[0].weekChart.korea.items)
    }
  }, [zingchartData])

  const handleClick = (props) => {
    const action = loadCurrentSong(props)
    dispatch(action)
  }

  let filterElement = document.querySelectorAll('.zingchart_filter')
  let borderElement = document.querySelectorAll('.zingchart_filter--active')

  filterElement.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.add("zingchart_filter--active")
      borderElement.forEach((btn) => {
        btn.classList.remove("zingchart_filter--active")
      });
    })
  })

  const handleClickLink = (...rest) => {
    const action = loadLink(rest)
    dispatch(action)
  }

  function Content({ list }) {
    return (
      <div className={styles.Album}>
        <div className='zingchart_img'>
          <div className='zingchart_img-item'></div>
          <div className='zingchart_img-blur'></div>
          <div className='zingchart_img-blur1'></div>
        </div>
        <div className='zingchart_rank-header-title ms-3 mb-3'>Bảng Xếp Hạng Tuần</div>
        <div className='d-flex justify-content-start align-items-center ms-3 py-5'>
          <div className='me-3 zingchart_filter zingchart_filter--active'>VIỆT NAM</div>
          <div className='me-3 zingchart_filter' >US-UK</div>
          <div className='me-3 zingchart_filter' >K-POP</div>
        </div>
        <Container>
          <Row>
            <Col xs={12}>
              <div>
                {list.map((song, index) => (
                  <div key={index} className={`${styles.albumWrapper}`}>
                    <div className={styles.albumLeft}>
                      <div className={`zingchart_count ${index === 0 ? 'zingchart_count--active_one' :
                        (index === 1 ? 'zingchart_count--active_two' : (index === 2 ? 'zingchart_count--active_three' : ''))}`}>{index + 1}</div>
                      <div>{song.rakingStatus === 0 ? <FontAwesomeIcon icon="fa-solid fa-minus" /> : (song.rakingStatus > 0 ?
                        <div className='zingchart_raking'><FontAwesomeIcon icon="fa-solid fa-caret-up" style={{ color: '#1dc186' }} /> {song.rakingStatus}</div> :
                        <div className='zingchart_raking'><FontAwesomeIcon icon="fa-solid fa-caret-down" style={{ color: '#e35050' }} /> {song.rakingStatus * -1}</div>
                      )}</div>
                      <div className={styles.albumImagePar}
                        onClick={() => handleClick({
                          encodeId: song.encodeId,
                          isPlay: true,
                          songs: list,
                          index: index
                        })}
                      >
                        <img className={styles.albumImage} src={song.thumbnail} alt="" />
                        <div
                          className={styles.albumIconChild}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-play" />
                        </div>
                      </div>
                      <div className={styles.albumArtistMain}>
                        <div>{song.title}</div>
                        <div className={styles.albumSongArtist}>
                          {song.artists !== undefined && song.artists.map((artist, index) => (
                            <Link className={styles.albumArtistItem} key={index} 
                            to={`${artist.link}/${artist.alias}`}
                            onClick={() => handleClickLink(artist.link, 'artistdetail')}
                            >
                              {index > 0 ? `, ${artist.name}` : artist.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link className={styles.albumCenter} to={song.album !== undefined && song.album.link}>
                      {song.album !== undefined && song.album.title}
                    </Link>
                    <div className={styles.albumRight}>
                      {Math.floor(song.duration / 60) >= 10 ?
                        Math.floor(song.duration / 60) :
                        `0${Math.floor(song.duration / 60)}`
                      }:
                      {song.duration % 60 >= 10 ? song.duration % 60 : `0${song.duration % 60}`}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  return (
    <Content list={zingchartData.length > 0 && zingchartData[0].weekChart.vn.playlistId === encodeId ? vn :
      (zingchartData[0].weekChart.us.playlistId === encodeId ? usuk : korea)} />
  )
}

export default Chartdetail