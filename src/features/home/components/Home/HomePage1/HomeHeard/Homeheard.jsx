import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from 'scss/Home3.module.scss'

function Homeheard({ list }) {
    const [playlist, setPlaylist] = useState([])
    useEffect(() => {
        if (list.length !== 0) {
            const newList = [...list]
            const restList = newList.splice(2, 1)
            setPlaylist(restList)
        }
    }, [list])
    return (
        <div className={styles.home3}>
            {playlist.map((playlist, index) => (
                <div key={index} className={styles.mainTitle}>
                    <div className={styles.home3Title}>{playlist.title}</div>
                    <Link to="/Top100">
                        <span>{'tất cả'.toUpperCase()}</span>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Homeheard