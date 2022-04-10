import React, { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx'
import styles from 'scss/Home7.module.scss'

function HomeChart({ list }) {
    const [chart, setChart] = useState([])
    const [time, setTime] = useState([])
    const [counts, setConuts] = useState({})

    const [count1, setCount1] = useState([])
    const [count2, setCount2] = useState([])
    const [count3, setCount3] = useState([])

    const chartRef = useRef()

    useEffect(() => {
        if (list.items) {
            const newList = [...list.items]
            const restList = newList.splice(0, 1)
            setChart(restList)
        }
    }, [list])

    useEffect(() => {
        if (chart.length !== 0) {
            setTime(chart[0].chart.times)
        }
    }, [chart])

    useEffect(() => {
        if (chart.length !== 0) {
            setConuts(chart[0].chart.items)
        }
    }, [chart])

    useEffect(() => {
        if (counts.ZZ8FBUW9) {
            setCount1(counts.ZZ8FBUW9)
        }
    }, [counts])

    useEffect(() => {
        if (counts.ZZ9OIWA0) {
            setCount2(counts.ZZ9OIWA0)
        }
    }, [counts])

    useEffect(() => {
        if (counts.ZZ9UWZO7) {
            setCount3(counts.ZZ9UWZO7)
        }
    }, [counts])

    const arrTime = time.map(time => `${time.hour}:00`)
    arrTime.map((item, index) => {
        if (index % 2 !== 0) {
            arrTime[index] = ''
        }
        return 0
    })
    const counter1 = count1.map(count => count.counter)
    const counter2 = count2.map(count => count.counter)
    const counter3 = count3.map(count => count.counter)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        tension: 0.3
    };

    const labels = arrTime;

    const data = {
        labels,
        datasets: [
            {
                data: counter1,
                borderColor: '#4a90e2',
                backgroundColor: '#4a90e2',
            },
            {
                data: counter2,
                borderColor: '#50e3c2',
                backgroundColor: '#50e3c2',
            },
            {
                data: counter3,
                borderColor: '#e35050',
                backgroundColor: '#e35050',
            },
        ],
    };

    const classes = clsx(styles.zingChartIndex, styles.zingChartIndex1)
    const classes1 = clsx(styles.zingChartIndex, styles.zingChartIndex2)
    const classes2 = clsx(styles.zingChartIndex, styles.zingChartIndex3)

    return (
        <div className={styles.zingChart}>
            <div className={styles.zingChartWrapper}>
                <Link className={styles.zingChartLink} to="/zingchart">#zingchart</Link>
                <button className={styles.zingChartbutton}>
                    <FontAwesomeIcon className={styles.zingChartIcon} icon="fa-solid fa-play" />
                </button>
            </div>
            <Container>
                <Row>
                    <Col xs={4}>
                        {chart.map((chart, index) => (
                            <div key={index}>
                                {chart.items.map((item, index) => (
                                    <div key={index}>
                                        {index > 2 ? <></> :
                                            <div className={styles.zingChartSong}>
                                                <div className={styles.zingChartBox}>
                                                    <div className={index === 0 ? classes : (index === 1 ? classes1 : classes2)}>
                                                        {index + 1}
                                                    </div>
                                                    <div className={styles.zingChartMain}>
                                                        <div className={styles.zingChartThumbPar}>
                                                            <div className={styles.zingChartThumb} style={{ backgroundImage: `url(${item.thumbnailM})` }}></div>
                                                        </div>
                                                        <div >
                                                            <div className={styles.zingChartArtits}>
                                                                {item.title}
                                                            </div>
                                                            <div style={{ display: 'flex' }}>
                                                                {item.artists.map((artist, index) => (
                                                                    <div className={styles.zingChartTagA} key={index}>
                                                                        {index > 0 ? `,${artist.name}` : `${artist.name}`}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index > 1 ?
                                                    <span>{Math.floor((item.score) / (chart.chart.totalScore) * 100) - 1}%</span> :
                                                    <span>{Math.ceil((item.score) / (chart.chart.totalScore) * 100)}%</span>
                                                }
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Col>
                    <Col xs={8}>
                        <Line
                            ref={chartRef}
                            options={options}
                            data={data}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomeChart