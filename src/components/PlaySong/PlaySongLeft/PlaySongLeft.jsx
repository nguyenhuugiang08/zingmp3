import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function PlaySongLeft() {
    return (
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
    )
}

export default PlaySongLeft