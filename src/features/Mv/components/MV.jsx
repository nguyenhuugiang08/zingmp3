import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import listMVApi from 'api/listMVApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import 'scss/Mv.scss';

function MV() {
  const [mvData, setMvData] = useState([])
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('IWZ9Z08I')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getList = async () => {
      const params = {
        id: id,
        page: page,
        count: 15,
      }
      if (page === 1) {
        setLoading(true)
      }
      const response = await listMVApi.getAll(params)
      const newList = [...mvData, ...response.data.items]
      setMvData(newList)
      setLoading(false)
    }

    getList()
  }, [id, page])

  const fetchData = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className='mv'>
      {loading ? <div>loading...</div> :
        <div >
          <div className='wrapper'>
            <div className='wrapper-filter wrapper-mv'>MV</div>
            <div className='wrapper-filter wrapper-vn ms-4 wrapper-filter wrapper--active'>việt nam</div>
            <div className='wrapper-filter wrapper-usuk ms-5'>us-uk</div>
            <div className='wrapper-filter wrapper-kpop ms-5'>kpop</div>
            <div className='wrapper-filter wrapper-concert ms-5'>hòa tấu</div>
          </div>
          <div className='mv-filter'>
            <div className='mv-filter__all me-3'><FontAwesomeIcon icon="fa-solid fa-music " /><span className='ms-2'>Tất Cả</span></div>
            <div className='mv-filter__listen'><FontAwesomeIcon icon="fa-solid fa-list-ol" /><span className='ms-2'>Nghe Nhiều</span></div>
          </div>
          <InfiniteScroll
            dataLength={mvData.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<div className='mv-loading-more'><ReactLoading type='spinningBubbles' color='#fff' height={'4%'} width={'4%'}/></div>}
          >
            <Container>
              <Row >
                {mvData.map(mv => (
                  <Col xs={4} className="mb-4">
                    <div key={mv.encodeId} className='mv-wrapper'>
                      <div className='mv-wrapper-first'>
                        <div className='mv-wrapper-first__img' style={{ backgroundImage: `url(${mv.thumbnailM})` }}></div>
                        <div className='mv-wrapper-first__icon'><FontAwesomeIcon icon="fa-solid fa-play" /></div>
                      </div>
                      <div className='mv-wrapper-second mt-2'>
                        <div className='mv-wrapper-second__img'>
                          <div className='mv-wrapper-second__img-thumbnail' style={{ backgroundImage: `url(${mv.artists[0].thumbnail})` }}></div>
                        </div>
                        <div className='ms-3'>
                          <div>{mv.title}</div>
                          <div className='mv-wrapper-second__artist'>
                            {mv.artists.map((artist, index) => (
                              <Link to={'/'} key={artist.id} className="me-1 mv-wrapper-second__artist-link">
                                {index > 0 ? `${artist.name}` : `${artist.name},`}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </InfiniteScroll>
        </div>
      }
    </div>
  )
}

export default MV