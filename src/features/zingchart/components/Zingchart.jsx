import chartHomeApi from 'api/chartHomeApi'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { getZingchartApi } from '../getZingchartSlice'
import styles from 'scss/Album.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { loadCurrentSong } from 'features/top100/top100Slice'
import 'scss/zingchart.scss'
import { loadLink } from 'features/linkSlice'

function Zingchart() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [vn, setVn] = useState([])
  const [usuk, setUsuk] = useState([])
  const [korea, setKorea] = useState([])

  const dispatch = useDispatch()
  const zingchartData = useSelector(state => state.zingchartData)

  useEffect(() => {
    const getZingchart = async () => {
      try {
        setLoading(true)
        const response = await chartHomeApi.getAll()
        dispatch(getZingchartApi(response.data))
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }
    getZingchart()
  }, [])

  useEffect(() => {
    if (zingchartData.length > 0) {
      setData(zingchartData[0].RTChart.items)
    }
  }, [zingchartData])

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

  const handleDisplaySongs = () => {
    let songs = document.querySelectorAll('.zingchart_hide')
    let showall = document.querySelector('.zingchart_showall')

    songs.forEach(song => {
      song.classList.remove('zingchart_hide')
    })
    showall.style.display = 'none'
  }

  document.onscroll = () => {
    let headerElement = document.querySelector('.header')
    if (document.documentElement.scrollTop < 70) {
      headerElement.style.backgroundColor = "transparent"
    } else {
      headerElement.style.backgroundColor = "#170f23"
    }
  }

  const handleClickLink = (...rest) => {
    const action = loadLink(rest)
    dispatch(action)
  }

  function Content({ list }) {
    return (
      <div>
        {list.map((item, index) => (
          index > 4 ? <div key={index}></div> :
            <div key={index} className={`${styles.albumWrapper} zingchart_wrapper`}>
              <div className={styles.albumLeft}>
                <div className={`zingchart_count`}>{index + 1}</div>
                <div>{item.rakingStatus === 0 ? <FontAwesomeIcon icon="fa-solid fa-minus" /> : (item.rakingStatus > 0 ?
                  <div className='zingchart_raking'><FontAwesomeIcon icon="fa-solid fa-caret-up" style={{ color: '#1dc186' }} /> {item.rakingStatus}</div> :
                  <div className='zingchart_raking'><FontAwesomeIcon icon="fa-solid fa-caret-down" style={{ color: '#e35050' }} /> {item.rakingStatus * -1}</div>
                )}</div>
                <div className={styles.albumImagePar}
                  onClick={() => handleClick({
                    encodeId: item.encodeId,
                    isPlay: true,
                    songs: data,
                    index: index
                  })}
                >
                  <img className={styles.albumImage} src={item.thumbnail} alt="" />
                  <div
                    className={styles.albumIconChild}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-play" />
                  </div>
                </div>
                <div className={styles.albumArtistMain}>
                  <div className='vn_title'>{item.title}</div>
                  <div className={`${styles.albumSongArtist} `}>
                    {item.artists !== undefined && item.artists.map((artist, index) => (
                      <Link className={`${styles.albumArtistItem} vn_artist`} key={index} to={artist.link}>
                        {index > 0 ? `, ${artist.name}` : artist.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`${styles.albumRight} ms-3`}>
                {Math.floor(item.duration / 60) >= 10 ?
                  Math.floor(item.duration / 60) :
                  `0${Math.floor(item.duration / 60)}`
                }:
                {item.duration % 60 >= 10 ? item.duration % 60 : `0${item.duration % 60}`}
              </div>
            </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.Album}>
      <div className='zingchart_img'>
        <div className='zingchart_img-item'></div>
        <div className='zingchart_img-blur'></div>
        <div className='zingchart_img-blur1'></div>
      </div>
      <Container>
        <Row>
          <Col xs={12}>
            <div>
              {data.map((song, index) => (
                <div key={index} className={`${styles.albumWrapper} ${index > 9 ? ' zingchart_hide' : ''}`} style={{ flex: '1' }}>
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
                        songs: data,
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
                          <Link className={styles.albumArtistItem} key={index} to={artist.link}>
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
              <div className='zingchart_showall'><span onClick={handleDisplaySongs}>Xem top 100</span></div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='mt-5 zingchart_rank'>
        <div className='zingchart_rank-blur'></div>
        <div className='zingchart_rank-header'>
          <Row>
            <Col xs={12} className='zingchart_rank-header-title'>
              <a href='/'>Bảng Xếp Hạng Tuần</a>
            </Col>
            <Col xs={4} >
              <div className="zingchart_rank-header-bg">
                <div className='zingchart_rank-header-name'>
                  Việt Nam
                  <div className={`${styles.albumImagePar} zingchart_rank-header-name__icon`}
                    onClick={() => handleClick({
                      encodeId: vn[0].encodeId,
                      isPlay: true,
                      songs: vn,
                      index: 0
                    })}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-play" />
                  </div>
                </div>
                <Content list={vn} />
                <Link to={zingchartData.length > 0 && `${zingchartData[0].weekChart.vn.link}/${zingchartData[0].weekChart.vn.playlistId}`}
                  onClick={() => handleClickLink(zingchartData[0].weekChart.vn.link, 'chart')}
                  className='zingchart_rank-header-all mt-3'>Xem tất cả</Link>
              </div>
            </Col>
            <Col xs={4}>
              <div className="zingchart_rank-header-bg">
                <div className='zingchart_rank-header-name'>US-UK  <div className={`${styles.albumImagePar} zingchart_rank-header-name__icon`}
                  onClick={() => handleClick({
                    encodeId: usuk[0].encodeId,
                    isPlay: true,
                    songs: usuk,
                    index: 0
                  })}
                >
                  <FontAwesomeIcon icon="fa-solid fa-play" />
                </div></div>
                <Content list={usuk} />
                <Link to={zingchartData.length > 0 && `${zingchartData[0].weekChart.us.link}/${zingchartData[0].weekChart.us.playlistId}`}
                  onClick={() => handleClickLink(zingchartData[0].weekChart.us.link, 'chart')}
                  className='zingchart_rank-header-all mt-3'>Xem tất cả</Link>
              </div>
            </Col>
            <Col xs={4}>
              <div className="zingchart_rank-header-bg">
                <div className='zingchart_rank-header-name'>K-Pop  <div className={`${styles.albumImagePar} zingchart_rank-header-name__icon`}
                  onClick={() => handleClick({
                    encodeId: korea[0].encodeId,
                    isPlay: true,
                    songs: korea,
                    index: 0
                  })}
                >
                  <FontAwesomeIcon icon="fa-solid fa-play" />
                </div></div>
                <Content list={korea} />
                <Link to={zingchartData.length > 0 && `${zingchartData[0].weekChart.korea.link}/${zingchartData[0].weekChart.korea.playlistId}`}
                  onClick={() => handleClickLink(zingchartData[0].weekChart.korea.link, 'chart')}
                  className='zingchart_rank-header-all mt-3'>Xem tất cả</Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Zingchart