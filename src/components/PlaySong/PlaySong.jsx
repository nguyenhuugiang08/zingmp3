import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "scss/PlaySong.scss"
import PlaySongRight from './PlaySongRight/PlaySongRight';
import PlaySongLeft from './PlaySongLeft/PlaySongLeft';
import PlaySongCenter from './PlaySongCenter/PlaySongCenter';

function PlaySong() {
    const dataStore = useSelector(state => state.top100)
    
    const [urlImage, setUrlImage] = useState('')
    const [title, setTitle] = useState('')
    const [artists, setArtists] = useState([])
    const [mounted, setMounted] = useState(false)
    const [duration, setDuration] = useState('')
    

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

    useEffect(() => {
        if (dataStore.length !== 0) {
            setDuration(dataStore[dataStore.length - 1].duration)
        }
    }, [dataStore])


    return (
        <div>
            {mounted &&
                <div className='play-song'>
                    <PlaySongRight
                        urlImage={urlImage}
                        title={title}
                        artists={artists}
                    />
                    <PlaySongCenter
                        duration={duration}
                    />
                   <PlaySongLeft/>
                </div>}
        </div>
    )
}

export default PlaySong