import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import lyricApi from 'api/lyricApi'
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ReactLoading from 'react-loading';
import "scss/PlaySongLyric.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getLyricApi } from '../getLyric';

function PlaySongLyric({ id, thumb, time }) {
  const [sentences, setSentences] = useState([])
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const lyric = useSelector(state => state.lyric)

  useEffect(() => {
    if (id) {
      const getLyric = async () => {
        const params = {
          id: id
        }
        setLoading(true)
        const response = await lyricApi.getAll(params)
        dispatch(getLyricApi(response.data))
        setLoading(false)
      }
      getLyric()
    }
  }, [id])

  useEffect(() => {
    if (lyric.length > 0) {
      setSentences(lyric[lyric.length - 1].sentences)
    }
  }, [lyric])

  let optionBtn = document.querySelectorAll('.play-song-lyric__options-item')
  let optionActiveBtn = document.querySelectorAll('.play-song-lyric__options-item--active')

  optionBtn.forEach((element, index) => {
    element.addEventListener('click', () => {
      element.classList.add("play-song-lyric__options-item--active")
      optionActiveBtn.forEach(btn => {
        btn.classList.remove("play-song-lyric__options-item--active")
      })
    })
  })

  const handleUnmountedLyric = () => {
    lyricRef.current.style.display = "none"
  }

  const handleAutoScroll = (index) => {
    if (sentencesRef.current) {
      sentencesRef.current.parentElement.scrollTop = 66 * index
    }
  }

  const lyricRef = useRef()
  const sentencesRef = useRef()

  return (
    <div ref={lyricRef} className='play-song-lyric'>
      <img src={`${lyric.length > 0 && lyric[lyric.length - 1].defaultIBGUrls[0]}`} alt="" style={{ position: 'fixed', bottom: '90px', opacity: '0.7' }} />
      <div className='play-song-lyric__wrapper'>
        <div className='play-song-lyric__options'>
          <div
            className='play-song-lyric__options-item'
          >
            Danh sách bài hát
          </div>
          <div
            className='play-song-lyric__options-item'
          >
            karaoke
          </div>
          <div
            className='play-song-lyric__options-item play-song-lyric__options-item--active'
          >
            Lời bài hát
          </div>
        </div>
        <div className='play-song-lyric__actions'>
          <div className='play-song__btn'><FontAwesomeIcon icon="fa-solid fa-up-right-and-down-left-from-center" /></div>
          <div className='play-song__btn'>
            <FontAwesomeIcon icon="fa-solid fa-gear" />
            <div>
              <div>
                Hình nền
                
              </div>
              <div>Chỉ phát nhạc nền</div>
              <div>Cỡ chữ lời nhạc</div>
              <div>Luôn phát nhạc toàn màn hình</div>
            </div>
          </div>
          <div
            className='play-song__btn'
            onClick={handleUnmountedLyric}
          >
            <FontAwesomeIcon icon="fa-solid fa-angle-down" />
          </div>
        </div>
      </div>
      <div className='play-song-lyric__main'>
        <Container>
          <Row xs={2}>
            <Col xs={5}>
              <div>
                <img className='play-song-lyric__img' src={thumb} alt="" />
              </div>
            </Col>
            <Col xs={7}>
              <div
                className='play-song-lyric__center'
              >
                {loading ? <ReactLoading type='spinningBubbles' color='#fff' height={100} style={{ padding: 180 + 'px' }} /> :
                  sentences && sentences.map((sentence, index) => (
                    <div
                      key={index}
                      ref={sentencesRef}
                      className={`play-song-lyric__center-sentences
                      ${index >= 1 && (sentence.words[sentence.words.length - 1].endTime / 1000).toFixed(3) - time.toFixed(3) < 0.1 ?
                          handleAutoScroll(index) : ''}
                    `}>
                      {sentence.words.map((word, index) => (
                        <div key={index}
                          className={`play-song-lyric__center-words
                            ${(word.startTime / 1000).toFixed(3) - time.toFixed(3) < 0.1 ?
                              'play-song-lyric__center-words--active'
                              :
                              ''}`
                          }
                        >
                          {`${word.data}`}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default PlaySongLyric