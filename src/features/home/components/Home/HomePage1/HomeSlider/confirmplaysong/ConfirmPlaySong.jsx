import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import infoSongApi from 'api/infoSongApi'
import playlistApi from 'api/playlistApi'
import { loadCurrentSong } from 'features/top100/top100Slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'scss/confirmplaysong.scss'

function ConfirmPlaySong() {
    const [info, setInfo] = useState({})
    const [array, setarray] = useState([])
    const [encodeId, setEncodeId] = useState('')

    const dispatch = useDispatch()
    const id = useSelector(state => state.id)

    useEffect(() => {
        if (id) {
            setEncodeId(id[id.length - 1])
        }
    }, [id])

    const handleClick = (props) => {
        const action = loadCurrentSong(props)
        dispatch(action)
        let ConfirmPlaySongElement = document.querySelector('.overlay_confirm')
        ConfirmPlaySongElement.style.display = "none"
    }

    useEffect(() => {
        const getInfoSong = async () => {
            const params = {
                id: encodeId
            }
            const respone = await infoSongApi.getAll(params)
            if (respone.data) {
                setInfo(respone.data)
            }
            if (info.album) {
                const getplaylist = async () => {
                    const params = {
                        id: info.album.encodeId
                    }
                    const respone = await playlistApi.getAll(params)
                    let newList = [...respone.data.song.items, ...respone.data.sections[0].items]
                    setarray(newList)
                }
                getplaylist()
            }
        }
        getInfoSong()
    }, [encodeId])

    useEffect(() => {
        if (info.album) {
            const getplaylist = async () => {
                const params = {
                    id: info.album.encodeId
                }
                const respone = await playlistApi.getAll(params)
                let newList = [...respone.data.song.items, ...respone.data.sections[0].items]
                setarray(newList)
            }
            getplaylist()
        }
    }, [info])

    const handleCancel = () => {
        let ConfirmPlaySongElement = document.querySelector('.overlay_confirm')
        ConfirmPlaySongElement.style.display = "none"
    }
    return (
        <div className='overlay_confirm'>
            <div className='confirmplaysong'>
                <div className='confirmplaysong_wrapper'>
                    <div>Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế.</div>
                    <div className='confirmplaysong_wrapper_img' ><div style={{ backgroundImage: `url(${info.thumbnailM})` }}></div></div>
                    <div>{info.title}</div>
                    <div className='confirmplaysong_wrapper_artist'>{info.artistsNames}</div>
                    <div className='confirmplaysong_wrapper_play' onClick={() => handleClick({
                        encodeId: encodeId,
                        isPlay: true,
                        songs: array,
                        index: 0
                    })}>
                        <FontAwesomeIcon className='me-2' icon="fa-solid fa-play" />
                        PHÁT BÀI HÁT
                    </div>
                    <div className='confirmplaysong_wrapper_addplaylist'>THÊM VÀO DANH SÁCH PHÁT</div>
                    <div className='confirmplaysong_wrapper_cancel' onClick={handleCancel}>BỎ QUA</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPlaySong