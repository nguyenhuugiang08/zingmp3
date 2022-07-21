import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import 'scss/newrelease.scss'

function NewRelease({ data }) {
    const [newRelease, setNewRelease] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        if (data.length > 0) {
            setNewRelease(data.filter(item => item.sectionType === 'new-release')[0])
        }
    }, [data])

    const handleClickFilter = (e, type) => {
        let filterElement = document.querySelectorAll('.new-release__filter--left-item')
        filterElement.forEach(element => {
            element.style.backgroundColor = "#ffffff1a"
        })
        e.target.style.backgroundColor = "#7200a1"

        if (type === 'song') {
            let songElement = document.querySelectorAll('.new-release__song')
            let albumElement = document.querySelectorAll('.new-release-album')
            songElement.forEach((item) => {
                item.classList.remove('d-none')
                item.classList.add('d-flex')
            })
            albumElement.forEach((item) => {
                item.classList.add('d-none')
            })
        } else {
            let songElement = document.querySelectorAll('.new-release__song')
            let albumElement = document.querySelectorAll('.new-release-album')
            songElement.forEach((item) => {
                item.classList.add('d-none')
            })
            albumElement.forEach((item) => {
                item.classList.remove('d-none')
                item.classList.add('d-flex')
            })
        }
    }

    return (
        <div className='new-release'>
            <div className='new-release__title'>{newRelease.title}</div>
            <div className='new-release__filter'>
                <div className='new-release__filter--left'>
                    <div className='new-release__filter--left-item new-release__filter--left-item--active me-3' onClick={e => handleClickFilter(e, 'song')}>BÀI HÁT</div>
                    <div className='new-release__filter--left-item me-3' onClick={(e) => handleClickFilter(e, 'album')}>ALBUM</div>
                </div>
                <a href='#' className='new-release__filter--right'>TẤT CẢ
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path></svg>
                </a>
            </div>
            {newRelease.items && newRelease.items.map((item, index) => (
                <div key={index}>
                    <Container>
                        <Row>
                            {item.song.map(song => (
                                <Col key={song.encodeId} xs={4}>
                                    <div className='new-release__song'>
                                        <img className='new-release__song-img' src={`${song.thumbnail}`} alt="" />
                                        <div className='new-release__song-info'>
                                            <div className='new-release__song-info__title'>{song.title}</div>
                                            <div className='new-release__song-info__artist'>
                                                {song.artists.map(artist => (
                                                    <div key={artist.id} className='new-release__song-info__artist-item'>{artist.name}, </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                            {item.album.map(album => (
                                <Col key={album.encodeId} xs={4}>
                                    <div className='new-release-album d-none'>
                                        <img className='new-release-album-img' src={`${album.thumbnail}`} alt="" />
                                        <div className='new-release-album-info'>
                                            <div className='new-release-album-info__title'>{album.title}</div>
                                            <div className='new-release-album-info__artist'>
                                                {album.artists.map((artist, index) => (
                                                    <div className='new-release__song-info__artist-item'>{artist.name}, </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            ))}
        </div>
    )
}

export default NewRelease