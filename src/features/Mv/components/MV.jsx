import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import listMVApi from 'api/listMVApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import Loading from './Loading';
import PlayMv from './PlayMv/PlayMv';
import 'scss/Mv.scss';
import { loadLink } from 'features/linkSlice';
import { useDispatch } from 'react-redux';
import categoryApi from 'api/categoryMV';

function MV() {
  const [mvData, setMvData] = useState([])
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('IWZ9Z08I')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [encodeId, setEncodeId] = useState('')
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const getList = async () => {
      try {
        const params = {
          id: id,
          page: page,
          count: 15,
        }
        if (page === 1) {
          setLoading(true)
        }
        const response = await listMVApi.getAll(params)
        if (response.data.items) {
          const newList = [...mvData, ...response.data.items]
          setMvData(newList)
        }
        setHasMore(response.data.hasMore)
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }

    getList()
  }, [id, page])

  useEffect(() => {
    const getCategoryMv = async () => {
      try {
        const params = {
          id: id,
        }

        const response = await categoryApi.getAll(params)
        setCategories(response.data.childs)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }

    getCategoryMv()
  }, [id])

  const fetchData = () => {
    setPage(prev => prev + 1)
  }

  const handleFilter = (e, type) => {
    let filterElement = document.querySelectorAll('.wrapper-filter--item')
    filterElement.forEach((element) => {
      element.style.border = 'none'
    })
    e.target.style.borderBottom = '2px solid #7200a1'
    setId(type === 'vn' ? 'IWZ9Z08I' : (type === 'usuk' ? 'IWZ9Z08O' : (type === 'kpop' ? 'IWZ9Z08W' : 'IWZ9Z086')))
    const list = []
    setMvData(list)
    setPage(1)
  }

  const handleSendEncodeId = (id) => {
    setEncodeId(id)
    setMounted(true)
  }

  const handleClosePlayer = () => {
    setMounted(false)
  }

  const handleClickLink = (...rest) => {
    const action = loadLink(rest)
    dispatch(action)
  }

  const handleCLickCategoryItem = (id) => {
    setId(id)
    const list = []
    setMvData(list)
    setPage(1)
  }

  return (
    <div className='mv'>
      <div >
        <div className='wrapper'>
          <div className='wrapper-filter wrapper-mv'>MV</div>
          <div className='wrapper-filter wrapper-filter--item wrapper-vn ms-4 wrapper--active' onClick={e => handleFilter(e, 'vn')}>việt nam</div>
          <div className='wrapper-filter wrapper-filter--item wrapper-usuk ms-5' onClick={e => handleFilter(e, 'usuk')}>us-uk</div>
          <div className='wrapper-filter wrapper-filter--item wrapper-kpop ms-5' onClick={e => handleFilter(e, 'kpop')}>kpop</div>
          <div className='wrapper-filter wrapper-filter--item wrapper-concert ms-5' onClick={e => handleFilter(e, 'concert')}>hòa tấu</div>
        </div>
        <div className='mv-filter'>
          <div className='mv-filter__all me-3'><FontAwesomeIcon icon="fa-solid fa-music " />
            <span className='ms-2'>
              Tất Cả
            </span>
          </div>
          <div className='mv-filter__listen'><FontAwesomeIcon icon="fa-solid fa-list-ol" /><span className='ms-2'>Nghe Nhiều</span></div>
        </div>
        <div className='category'>
          <Container>
            <Row >
              <Col xs={4} className='category-wrapper'>
                <Row>
                  {categories.map(category => (
                    <Col xs={6}>
                      <div className='category-wrapper__item'
                        onClick={() => handleCLickCategoryItem(category.id)}
                      >
                        {category.name}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        {loading ? <Loading /> :
          <InfiniteScroll
            dataLength={mvData.length} //This is important field to render the next data
            next={hasMore && fetchData}
            hasMore={true}
            loader={!hasMore ? <></> : <div className='mv-loading-more'><ReactLoading type='spinningBubbles' color='#fff' height={'4%'} width={'4%'} /></div>}
          >
            <Container>
              <Row >
                {mvData.map(mv => (
                  <Col xs={4} className="mb-4" key={mv.encodeId}>
                    <div className='mv-wrapper'>
                      <div className='mv-wrapper-first'>
                        <div className='mv-wrapper-first__img' style={{ backgroundImage: `url(${mv.thumbnailM})` }}></div>
                        <div className='mv-wrapper-first__icon'
                          onClick={() => handleSendEncodeId(mv.encodeId)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-play" />
                        </div>
                      </div>
                      <div className='mv-wrapper-second mt-2'>
                        <div className='mv-wrapper-second__img'>
                          <div className='mv-wrapper-second__img-thumbnail' style={{ backgroundImage: `url(${mv.artists[0].thumbnail})` }}></div>
                        </div>
                        <div className='ms-3'>
                          <div>{mv.title}</div>
                          <div className='mv-wrapper-second__artist'>
                            {mv.artists.map((artist, index) => (
                              <Link
                                to={`${artist.link}/${artist.alias}`}
                                onClick={() => handleClickLink(artist.link, 'artistdetail')}
                                key={artist.id}
                                className="me-1 mv-wrapper-second__artist-link"
                              >
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
        }
      </div>
      {!mounted ? <></> :
        <div>
          <div className='playmv-container-header__icon'
            onClick={handleClosePlayer}
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </div>
          <PlayMv encodeId={encodeId} />
        </div>
      }
    </div>
  )
}

export default MV