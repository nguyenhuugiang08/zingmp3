import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from 'scss/Home3.module.scss'

function Homeheard({ data }) {
    const [playlist, setPlaylist] = useState([])
    useEffect(() => {
        if (data.length !== 0) {
            const newList = [...data]
            const restList = newList.splice(2, 1)
            setPlaylist(restList)
        }
    }, [data])
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