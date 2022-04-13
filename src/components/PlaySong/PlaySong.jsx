import React, { useState, useEffect, useRef } from 'react'
import songApi from 'api/songApi'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactLoading from 'react-loading';
import "scss/PlaySong.scss"
import { Link } from 'react-router-dom';

function PlaySong() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [id, setId] = useState('')
    const [pathSong, setPathSong] = useState('')
    const [loading, setLoading] = useState(false)
    const dataStore = useSelector(state => state.top100)

    const [urlImage, setUrlImage] = useState('')
    const [title, setTitle] = useState('')
    const [artists, setArtists] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (id) {
            const getPath = async () => {
                const params = {
                    id: id
                }
                setLoading(true)
                const response = await songApi.getAll(params)
                setPathSong(response.data)
                setLoading(false)
            }
            getPath()
        }
    }, [id])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setId(dataStore[dataStore.length - 1].encodeId)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setUrlImage(dataStore[dataStore.length - 1].thumbnail)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setTitle(dataStore[dataStore.length - 1].title)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setArtists(dataStore[dataStore.length - 1].artists)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setMounted(dataStore[dataStore.length - 1].isPlay)
        }
    }, [dataStore])

    const handlePlay = () => {
        if (!isPlaying) {
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    const audioRef = useRef()

    return (
        <div>
            {mounted && 
                <div className='play-song'>
                    <div className='play-song__right'>
                        <div className='play-song__right-box'>
                            <div className='play-song__thumb' style={{ backgroundImage: `url(${urlImage})` }}></div>
                        </div>
                        <div className='play-song__right-wrapper'>
                            <div className='play-song__right-title'>{title}</div>
                            <div className='play-song__right-singers'>
                                {artists.map((artist, index) => (
                                    <Link to={artist.link} className='play-song__right-singer' key={index}>{artist.name}</Link>
                                ))}
                            </div>
                        </div>
                        <div className='play-song__right-wrapper-btn'>
                            <button className='play-song__btn'>
                                <FontAwesomeIcon icon="fa-regular fa-heart" />
                            </button>
                            <button className='play-song__btn'>
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                            </button>
                        </div>
                    </div>
                    <div className='play-song__action'>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-shuffle" />
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-backward-step" />
                        </button>
                        <button
                            onClick={handlePlay}
                            className="play-song__btn btn-play"
                        >
                            {loading ? <ReactLoading type='spinningBubbles' color='#fff' height={30} width={30} /> :
                                (isPlaying ? <FontAwesomeIcon icon="fa-solid fa-pause" /> : <FontAwesomeIcon icon="fa-solid fa-play" />)}
                            {pathSong && <audio ref={audioRef} src={pathSong["128"]}></audio>}
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-forward-step" />
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-repeat" />
                        </button>
                    </div>
                    <div className='play-song__left'>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-regular fa-circle-play" />
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-microphone" />
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-regular fa-window-restore" />
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-volume-high" />
                        </button>
                        <button className='play-song__btn'>
                            <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                        </button>
                    </div>
                </div>}
        </div>
    )
}

export default PlaySong