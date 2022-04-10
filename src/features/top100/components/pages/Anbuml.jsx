import { Button } from 'reactstrap'
import React, { useEffect, useRef, useState } from 'react'
import playlistApi from 'api/playlistApi'

function Anbuml() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [playlist, setPlaylist] = useState({})

    useEffect(() => {
        const getPlayList = async () => {
            const params = {
                id: 'ZWZB969E'
            }
            const response = await playlistApi.getAll(params)
            setPlaylist(response.data)
        }
        getPlayList()
    },[])

    console.log(playlist)

    const audioRef = useRef()

    const handlePlay = () => {
        if(!isPlaying){
            audioRef.current.play()
            setIsPlaying(true)
        }else {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    return (
        <div style={{ color: '#fff' }}>
            <Button
                onClick={handlePlay}
            >Play
                <audio ref={audioRef} src='https://vnno-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/99d2818da2ca4b9412db/6993440792680589318?authen=exp=1649609647~acl=/99d2818da2ca4b9412db/*~hmac=9d8384625ea0bc89e6d8df686b06002f&fs=MTY0OTQzNjg0NzE4NXx3ZWJWNnwwfDMdUngMjM4LjI0LjE5'></audio>
            </Button>
        </div>
    )
}

export default Anbuml