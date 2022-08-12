import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import 'scss/CategoryPodcast.scss';

function RadioPostcardCategory({ list }) {
  const [categoryPodcast, setCategoryPodcast] = useState([])

  useEffect(() => {
    if (list.length > 0) {
      setCategoryPodcast(list.filter(item => item.sectionType === 'podcast_category'))
    }
  }, [list])

  return (
    <div className='category-podcast mb-4'>
      {categoryPodcast.map(item => (
        <div key={item.sectionId}>
          <div className='category-podcast__title mb-3'>{item.title}</div>
          <Container fluid>
            <Row xs={2} md={3} lg={4} xl={5}>
              {item.items.map((podcast, index) => (
                <Link to={'/'} key={podcast.id} className="mb-3">
                  {index >= 5 ? <></> :
                    <div className='category-podcast__wrapper'>
                      <div className='category-podcast__wrapper__img' style={{ backgroundImage: `url(${podcast.thumbnail})` }}></div>
                    </div>
                  }
                </Link>
              ))}
            </Row>
          </Container>
        </div>
      ))}
    </div>
  )
}

export default RadioPostcardCategory;