import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading';
import songApi from 'api/songApi'
import { useSelector } from 'react-redux';

function PlaySongCenter({ duration }) {
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const [pathSong, setPathSong] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [time, setTime] = useState(0)
    const [isRepeat, setIsRepeat] = useState(false)
    const [listSong, setListSong] = useState([])
    const [index, setIndex] = useState(0)
    const dataStore = useSelector(state => state.top100)

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
            setListSong(dataStore[dataStore.length - 1].songs)
        }
    }, [dataStore])

    useEffect(() => {
        if (dataStore.length !== 0) {
            setIndex(dataStore[dataStore.length - 1].index)
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

    const handleOnchaneSeek = () => {
        if (loading) {
            seekRef.current.value = 0
            setTime(0)
            audioRef.current.pause()
        } else {
            seekRef.current.value = (audioRef.current.currentTime / duration) * 100
            setTime(audioRef.current.currentTime)
        }
    }

    const handleClickRepeatBtn = () => {
        repeatBtnRef.current.classList.toggle("play-song__btn--active")
        if (!isRepeat) {
            setIsRepeat(true)
        } else {
            setIsRepeat(false)
        }
    }

    const handleChange = () => {
        const seekTime = seekRef.current.value / 100 * duration
        audioRef.current.currentTime = seekTime
        audioRef.current.play()
        setIsPlaying(true)
    }

    const handleNextSong = () => {
        let encodeIdNext = listSong[index].encodeId
        if(encodeIdNext > listSong.length){
            encodeIdNext = 0
        }else {
            setId(encodeIdNext)
        }
        console.log(id)
    }

    const handleEndSong = () => {
        if (isRepeat) {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    const audioRef = useRef()
    const seekRef = useRef()
    const repeatBtnRef = useRef()

    return (
        <div className='play-song__center'>
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
                        (!isPlaying ? <FontAwesomeIcon icon="fa-solid fa-play" /> : <FontAwesomeIcon icon="fa-solid fa-pause" />)}
                    {pathSong && <audio
                        ref={audioRef}
                        src={pathSong["128"]}
                        onTimeUpdate={handleOnchaneSeek}
                        onEnded={handleEndSong}
                        autoPlay={true}
                    ></audio>}
                </button>
                <button
                    className='play-song__btn'
                    onClick={handleNextSong}
                >
                    <FontAwesomeIcon icon="fa-solid fa-forward-step" />
                </button>
                <button
                    className='play-song__btn'
                    ref={repeatBtnRef}
                    onClick={handleClickRepeatBtn}
                >
                    <FontAwesomeIcon icon="fa-solid fa-repeat" />
                </button>
            </div>
            <div className='play-song__duration'>
                <span className='play-song__duration-time-left'>
                    {Math.floor(time / 60) > 10 ? Math.floor(time / 60) :
                        `0${Math.floor(time / 60)}`}
                    :{time % 60 >= 10 ? Math.ceil(time % 60) : `0${Math.ceil(time % 60)}`}
                </span>
                <div className='play-song__duration-center'>
                    <input
                        type="range" id='seek' min={0} max={100} step={1} ref={seekRef}
                        className="play-song__duration-input"
                        onChange={handleChange}
                    />
                </div>
                <span className='play-song__duration-time-right'>{Math.floor(duration / 60) > 10 ? Math.floor(duration / 60) : `0${Math.floor(duration / 60)}`}
                    :{duration % 60 > 10 ? duration % 60 : `0${duration % 60}`}
                </span>
            </div>
        </div>
    )
}

export default PlaySongCenter