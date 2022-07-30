import videoApi from 'api/videoApi';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'reactstrap';
import screenfull from 'screenfull'
import 'scss/PlayMv.scss'

function PlayMv({ encodeId }) {
  const [data, setData] = useState({})
  const [artists, setArtists] = useState([])
  const [list, setList] = useState([])
  const [mode, setMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [id, setId] = useState(encodeId)
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState({
    isplay: false,
    volume: 1,
    muted: false,
    repeat: false,
    time: 0,
  })

  const {
    isplay,
    volume,
    muted,
    repeat,
    time,
  } = status

  const circleRef = useRef()
  const modeRef = useRef()
  const videoRef = useRef()
  const playerVideoRef = useRef()
  const progressRef = useRef()
  const playerRef = useRef()
  const volumeRef = useRef()

  useEffect(() => {
    const getMv = async () => {
      const params = {
        id: id
      }
      setLoading(true)
      const response = await videoApi.getAll(params)
      setData(response.data)
      setLoading(false)
      setStatus({...status, isplay: false})
    }

    getMv()

  }, [id])

  useEffect(() => {
    if (data.artists) {
      setArtists(data.artists)
    }
  }, [encodeId, data])

  useEffect(() => {
    if (data.recommends && id === encodeId) {
      const newList = [data.song, ...data.recommends]
      setList(newList)
    }
  }, [data, encodeId])


  // xử lý dark & light mode
  const handleClickMode = () => {
    if (mode) {
      circleRef.current.style.marginLeft = '13px'
      circleRef.current.style.animation = 'lightMode linear 0.2s'
      modeRef.current.style.backgroundColor = '#7200a1'
      setMode(false)
    } else {
      circleRef.current.style.marginLeft = '0px'
      circleRef.current.style.animation = 'darkMode linear 0.2s'
      modeRef.current.style.backgroundColor = '#a0a0a0'
      setMode(true)
    }
  }

  // xử lý prev video trong danh sách
  const handlePrevMv = () => {
    if (list.length > 0) {
      setIndex(prev => prev - 1)
      if (index <= 0) {
        setIndex(list.length - 1)
        setId(list[list.length - 1].encodeId)
      } else {
        setId(list[index - 1].encodeId)
      }
    }
  }

  //xứ lý next video tiếp theo trong danh sách
  const handleNextMv = () => {
    if (list.length > 0) {
      setIndex(prev => prev + 1)
      if (index >= list.length - 1) {
        setIndex(0)
        setId(list[0].encodeId)
      } else {
        setId(list[index + 1].encodeId)
      }
    }
  }

  //xử lý play & pause video
  const handlePlay = () => {
    if (!isplay) {
      setStatus({ ...status, isplay: true })
    } else {
      setStatus({ ...status, isplay: false })
    }
  }

  // xử lý khi thay đôi volume
  const handleChangeVolume = (e) => {
    setStatus({ ...status, volume: e.target.value })
    console.log(volume)
  }

  //xử lý khi ấn mute 
  const handleMuteVolume = () => {
    if (!muted) {
      setStatus({ ...status, muted: true })
    } else {
      setStatus({ ...status, muted: false })
    }
  }

  // xử lý khi kết thúc video
  const handleEnded = () => {
    if (!repeat) {
      handleNextMv()
    }
  }

  // xử lý lặp lại video 
  const handleRepeat = (e) => {
    if (!repeat) {
      e.target.classList.add('player-custom-right__item--active')
      setStatus({ ...status, repeat: true })
    } else {
      e.target.classList.remove('player-custom-right__item--active')
      setStatus({ ...status, repeat: false })
    }
  }

  // xử lý phóng to thu nhỏ màn hình
  const handleSreenFull = () => {
    screenfull.toggle(playerVideoRef.current)
  }

  // xử lý tua video
  const handleRewind = (e) => {
    if (videoRef.current) {
      let currentTime = e.target.value * videoRef.current.getDuration() / 100
      videoRef.current.seekTo(currentTime)
    }
  }

  //cử lý bắt đầu load video thanh thời gian chạy
  const handleStartPlay = () => {
    setStatus({ ...status, time: videoRef.current.getCurrentTime() / videoRef.current.getDuration() * 100 })
    progressRef.current.value = time
  };

  //xử lý nhấn space để play & pause video
  document.addEventListener('keyup', function (event) {
    if (event.keyCode === 32) {
      handlePlay()
    }
  }
  )

  //xử lý display control
  const handleDisplayControl = () => {
    playerRef.current.classList.add('d-block')
    playerRef.current.classList.remove('d-none')
    playerVideoRef.current.style.cursor = 'pointer'
  }

  //xử lý hide control
  const handleHideControl = () => {
    playerRef.current.classList.add('d-none')
    playerRef.current.classList.remove('d-block')
  }

  //xử lý click vào video nào phát video đó
  const handleLoadCurrentVideo = (songId) => {
    setId(songId)
  }

  // xử lý hover icon display volume
  const handleDisplayVolume = () => {
    volumeRef.current.style.display = 'block'
  }

  // xử lý hover icon display volume
  const handleHideVolume = () => {
    volumeRef.current.style.display = 'none'
  }

  return (
    <div className='playmv'>
      <div className='playmv-blur'></div>
      <div className='playmv-container'>
        <div className='playmv-container-header mb-3 mx-3'>
          <div>
            <div className='playmv-container__wrapper'>
              <div className='playmv-container-box'>
                <div className='playmv-container-box-img' style={{ backgroundImage: `url(${data.artists && data.artists[0].thumbnail})` }}></div>
              </div>
              <div>
                <div className='ms-1 playmv-container__wrapper-title'>{data.title}</div>
                <div className='playmv-container__wrapper-name'>
                  {artists.map((artist) => (
                    <Link key={artist.id} to={'/'} className='ms-1'>{artist.name},</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='playmv-container-header__icon'
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </div>
        </div>
        <Container fluid>
          <Row>
            <Col xs={9}>
              {loading ? <>Loading...</> :
                <div ref={playerVideoRef} className='position-relative wrapper'
                  onMouseOver={handleDisplayControl}
                  onMouseOut={handleHideControl}
                >
                  <ReactPlayer
                    ref={videoRef}
                    url={`${data.streaming && data.streaming.mp4["720p"]}`}
                    playing={!isplay}
                    controls={false}
                    volume={volume}
                    width={1110}
                    height={624}
                    muted={muted}
                    onEnded={handleEnded}
                    loop={repeat}
                    onProgress={handleStartPlay}
                  />
                  <div className='player d-none' ref={playerRef}>
                    <div className='player-custom-progress'>
                      <input ref={progressRef} type="range" step={0.5} min={0} max={100} className='player-custom-progress-input ms-3 me-5'
                        onChange={handleRewind}
                      />
                    </div>
                    <div className='player-custom'>
                      <div className='player-custom-left'>
                        <div className='player-custom-left__item'
                          onClick={e => handlePrevMv(e)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-backward-step" />
                        </div>
                        <div className='player-custom-left__item'
                          onClick={handlePlay}
                        >
                          {!isplay ? <FontAwesomeIcon icon="fa-solid fa-pause" /> : <FontAwesomeIcon icon="fa-solid fa-play" />}
                        </div>
                        <div className='player-custom-left__item'
                          onClick={handleNextMv}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-forward-step" />
                        </div>
                        <div className='player-custom-left__item d-flex justify-content-start align-items-center'
                          onMouseOver={handleDisplayVolume}
                          onMouseOut={handleHideVolume}
                        >
                          <div className='player-custom-left__item-icon'
                            onClick={handleMuteVolume}
                          >
                            {!muted && volume > 0 ? <FontAwesomeIcon icon="fa-solid fa-volume-high" /> : <FontAwesomeIcon icon="fa-solid fa-volume-xmark" />}
                          </div>
                          <input ref={volumeRef} type="range" step={0.01} min={0} max={1} className='player-custom-left__item-input ms-2'
                            onChange={e => handleChangeVolume(e)}
                          />
                        </div>
                        <div className='player-custom-left__item'
                          style={{ fontSize: '14px' }}
                        >
                          {loading ? '00' : (Math.floor(time / 60) >= 10 ? Math.floor(time / 60) :
                            `0${Math.floor(time / 60)}`)}
                          :{loading ? '00' : (time % 60 > 9 ? Math.ceil(time % 60) : `0${Math.ceil(time % 60)}`)} | {` `}
                          {Math.floor(data.duration / 60) > 10 ? Math.floor(data.duration / 60) : `0${Math.floor(data.duration / 60)}`}
                          :{data.duration % 60 > 10 ? data.duration % 60 : `0${data.duration % 60}`}
                        </div>
                      </div>
                      <div className='player-custom-right'>
                        <div className='player-custom-right__item'
                          onClick={handleRepeat}>
                          <FontAwesomeIcon icon="fa-solid fa-repeat" />
                        </div>
                        <div className='player-custom-right__item'><FontAwesomeIcon icon="fa-solid fa-gear" /></div>
                        <div className='player-custom-right__item'
                          onClick={handleSreenFull}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-expand" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </Col>
            <Col xs={3}>
              <div className='list-mv'>
                <div className='list-mv__header'>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>Danh Sách Phát</div>
                  <div className='list-mv__header-mode'>
                    TỰ ĐỘNG PHÁT
                    <div className='btn-mode list-mv__header-mode__btn ms-2' ref={modeRef} onClick={handleClickMode}>
                      <div className='btn-mode__circle list-mv__header-mode__btn-circle' ref={circleRef}></div>
                    </div>
                  </div>
                </div>

                <div className='list-mv__content'>
                  {list.map(song => (
                    <div key={song.encodeId} className='list-mv__content-wrapper my-2'>
                      <div className='list-mv__content-box'>
                        <div className='list-mv__content-thumbnail'
                          style={{ backgroundImage: `url(${song.thumbnail})` }}
                          onClick={() => handleLoadCurrentVideo(song.encodeId)}
                        ></div>
                      </div>
                      <div className='ms-3' style={{ width: 'calc(100% - 120px)' }}>
                        <div className='list-mv__content-title'>{song.title}</div>
                        <div className='list-mv__content-name'>
                          {song.artists.map((artist, index) => (
                            <Link to={'/'} key={artist.id}>{index > song.artists.length - 2 ? artist.name : `${artist.name}, `}</Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default PlayMv