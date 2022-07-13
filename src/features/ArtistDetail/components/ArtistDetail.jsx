import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import artistApi from 'api/artistApi'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { getInfoArtistApi } from '../getiArtistSlice'
import Artistalbum from './Artistalbum/ArtistAlbum'
import Artistamong from './Artistamong/Artistamong'
import Artistcollection from './Artistcollection/Artistcollection'
import ArtistMv from './Artistmv/ArtistMv'
import Artistoutstanding from './Artistoutstanding/Artistoutstanding'
import Artistsingle from './Artistsingle/Artistsingle'
import 'scss/ArtistDetail.scss'
import { loadCurrentSong } from 'features/top100/top100Slice'
import Artistlike from './Artistlike/Artistlike'

function ArtistDetail() {
  const { encodeId } = useParams()
  const dispatch = useDispatch()
  const artistData = useSelector(state => state.artist)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const getInfoArtist = async () => {
      const params = {
        name: encodeId
      }
      setLoading(true)
      const respone = await artistApi.getAll(params)
      dispatch(getInfoArtistApi(respone.data))
      setLoading(false)
    }
    getInfoArtist()
  }, [encodeId])

  useEffect(() => {
    if (artistData.length > 0) {
      setData(artistData[artistData.length - 1])
    }
  }, [artistData])

  const handleClick = (props) => {
    const action = loadCurrentSong(props)
    dispatch(action)
  }

  let index = Math.floor(Math.random() * 40)

  return (
    <div>
      {loading ? <span style={{ color: '#fff' }}>Loading...</span> :
        <div>
          <div className='Artist-blur'></div>
          <div className='Artist-detail'>
            <Container>
              <Row>
                <Col xs={7}>
                  <div className='Artist-detail__name'>{data.name}</div>
                  <div className='Artist-detail__biography'>
                    {data.biography}
                  </div>
                  <div className='Artist-detail__more'>XEM THÊM</div>
                  <div className='d-flex justify-content-start align-items-center mt-4'>
                    <div className='Artist-detail__play' onClick={() => handleClick(
                      {
                        encodeId: data.sections && data.sections.length > 0 && data.sections[0].items[index].encodeId,
                        isPlay: true,
                        songs: data.sections && data.sections.length > 0 && data.sections[0].items,
                        index: index
                      }
                    )}>
                      <FontAwesomeIcon icon="fa-solid fa-play" className='me-2' />
                      PHÁT NHẠC
                    </div>
                    <div className='ms-3 Artist-detail__care'>QUAN TÂM <span className='mx-1'>•</span> {Math.floor(data.totalFollow / 1000)}K</div>
                  </div>
                  <div>
                    <i class="icon ic-zing-choice"></i>
                  </div>
                </Col>
                <Col xs={5}>
                  <div className='d-flex justify-content-end'>
                    <img className='Artist-detail__img' src={data.thumbnail} alt="" />
                  </div>
                </Col>
              </Row>
              <Row>
                <div className='Artist-detail__filter '>
                  <div className='Artist-detail__filter-wrapper d-flex justify-content-between align-items-center'>
                    <div className='Artist-detail__filter-wrapper-cate Artist-detail__filter-wrapper-cate--active'>TỔNG QUAN</div>
                    <div className='Artist-detail__filter-wrapper-cate'>HOẠT ĐỘNG</div>
                    <div className='Artist-detail__filter-wrapper-cate'>SỰ KIỆN</div>
                    <div className='Artist-detail__filter-wrapper-cate'>BÀI HÁT</div>
                    <div className='Artist-detail__filter-wrapper-cate'>SINGLE {'&'} EP</div>
                    <div className='Artist-detail__filter-wrapper-cate'>ALBUM</div>
                    <div className='Artist-detail__filter-wrapper-cate'>MV</div>
                  </div>
                </div>
              </Row>
              <Artistoutstanding />
              <Artistsingle />
              {data.sections && data.sections.length === 7 ? < Artistalbum /> : <></>}
              <ArtistMv />
              <Artistcollection />
              <Artistamong />
              <Artistlike />
            </Container>

          </div>
        </div>
      }
    </div >
  )
}

export default ArtistDetail