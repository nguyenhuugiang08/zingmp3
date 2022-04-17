import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import lyricApi from 'api/lyricApi'
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ReactLoading from 'react-loading';
import "scss/PlaySongLyric.scss"

function PlaySongLyric({ id, thumb, time }) {
  const [lyric, setLyric] = useState({})
  const [sentences, setSentences] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const getLyric = async () => {
        const params = {
          id: id
        }
        setLoading(true)
        const response = await lyricApi.getAll(params)
        setLyric(response.data)
        setLoading(false)
      }
      getLyric()
    }
  }, [id])

  useEffect(() => {
    if (lyric.sentences) {
      setSentences(lyric.sentences)
    }
  }, [lyric])
  console.log(time)

  const handleClickOption = () => {
    optRef.current.classList.add("play-song-lyric__options-item--active")
    optRef1.current.classList.remove("play-song-lyric__options-item--active")
    optRef2.current.classList.remove("play-song-lyric__options-item--active")
  }

  const handleClickOption1 = () => {
    optRef.current.classList.remove("play-song-lyric__options-item--active")
    optRef1.current.classList.add("play-song-lyric__options-item--active")
    optRef2.current.classList.remove("play-song-lyric__options-item--active")
  }

  const handleClickOption2 = () => {
    optRef.current.classList.remove("play-song-lyric__options-item--active")
    optRef1.current.classList.remove("play-song-lyric__options-item--active")
    optRef2.current.classList.add("play-song-lyric__options-item--active")
  }

  const handleUnmountedLyric = () => {
    lyricRef.current.style.display = "none"
  }

  const optRef = useRef()
  const optRef1 = useRef()
  const optRef2 = useRef()
  const lyricRef = useRef()

  return (
    <div ref={lyricRef} className='play-song-lyric'>
      <div className='play-song-lyric__wrapper'>
        <div className='play-song-lyric__options'>
          <div
            ref={optRef}
            className='play-song-lyric__options-item'
            onClick={handleClickOption}
          >
            Danh sách bài hát
          </div>
          <div
            ref={optRef1}
            className='play-song-lyric__options-item'
            onClick={handleClickOption1}
          >
            karaoke
          </div>
          <div
            ref={optRef2}
            className='play-song-lyric__options-item'
            onClick={handleClickOption2}
          >
            Lời bài hát
          </div>
        </div>
        <div className='play-song-lyric__actions'>
          <div className='play-song__btn'><FontAwesomeIcon icon="fa-solid fa-up-right-and-down-left-from-center" /></div>
          <div className='play-song__btn'><FontAwesomeIcon icon="fa-solid fa-gear" /></div>
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
              <div className='play-song-lyric__center'>
                {loading ? <ReactLoading type='spinningBubbles' color='#fff' height={100} width={100} /> :
                  sentences.map((sentence, index) => (
                    <div key={index} className='play-song-lyric__center-sentences'>
                      {sentence.words.map((word, index) => (
                        <div key={index}
                          className={`play-song-lyric__center-words
                            ${(word.startTime / 1000).toFixed(3) - time.toFixed(3) < 0.1 ? 'play-song-lyric__center-words--active' : ''}`
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