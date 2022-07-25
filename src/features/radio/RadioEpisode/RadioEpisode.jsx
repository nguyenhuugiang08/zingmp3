import React, { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import 'scss/Episode.scss';

function RadioEpisode({ list }) {
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    if (list.length > 0) {
      setEpisodes(list.filter(item => item.sectionType === 'episode'))
    }
  }, [list])

  return (
    <div className='episode'>
      {episodes.map(episode => (
        <div key={episode.sectionId}>
          <div className='episode-title mb-3'>
            {episode.title}
          </div>
          <Container>
            <Row xs={3}>
              {episode.items.map(item => (
                <div key={item.encodeId} className='episode-wrapper'>
                  <div className='episode-wrapper-left'>
                    <div className='episode-wrapper-left__thumbnail' style={{ backgroundImage: `url(${item.thumbnail})` }}></div>
                  </div>
                  <div className='episode-wrapper-right'>
                    <div className='episode-wrapper-right-title'>{item.title}</div>
                    <div className='episode-wrapper-right-name'>{item.album.title}</div>
                    <div className='episode-wrapper-right-duration'>{Math.round(item.duration/60)} phút</div>
                  </div>
                </div>
              ))}
            </Row>
          </Container>
        </div>
      ))}
    </div>
  )
}

export default RadioEpisode