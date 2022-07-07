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
  }, [])

  useEffect(() => {
    if (artistData.length > 0) {
      setData(artistData[artistData.length - 1])
    }
  }, [artistData])

  return (
    <div>
      {loading ? <span style={{ color: '#fff' }}>Loading...</span> :
        <div style={{ color: '#fff' }}>
          <Container>
            <Row>
              <Col xs={7}>
                <div>{data.name}</div>
                <div>{data.biography}</div>
                <div className='d-flex justify-content-start align-items-center'>
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-play" />
                    PHÁT NHẠC
                  </div>
                  <div className='ms-5'>QUAN TÂM <span className='mx-1'>•</span> {Math.floor(data.totalFollow / 1000)}K</div>
                </div>
                <div>
                  <i class="icon ic-zing-choice"></i>
                </div>
              </Col>
              <Col xs={5}>
                <div>
                  <img src={data.thumbnail} alt="" />
                </div>
              </Col>
            </Row>
            <Row>
              <div className='d-flex justify-content-between align-items-center px-5'>
                <div>TỔNG QUAN</div>
                <div>HOẠT ĐỘNG</div>
                <div>SỰ KIỆN</div>
                <div>BÀI HÁT</div>
                <div>SINGLE {'&'} EP</div>
                <div>ALBUM</div>
                <div>MV</div>
              </div>
            </Row>
            <Artistoutstanding />
            <Artistsingle />
            <Artistalbum/>
            <ArtistMv/>
            <Artistcollection/>
            <Artistamong/>
          </Container>

        </div>
      }
    </div >
  )
}

export default ArtistDetail