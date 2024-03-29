import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "scss/Home7.module.scss";
import { loadLink } from "app/linkSlice";
import { useDispatch } from "react-redux";

function RTChartType({ data }) {
  const [chart, setChart] = useState({});
  const [time, setTime] = useState([]);
  const [counts, setConuts] = useState({});

  const [count1, setCount1] = useState([]);
  const [count2, setCount2] = useState([]);
  const [count3, setCount3] = useState([]);

  const chartRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setChart(data.filter((item) => item.sectionType === "RTChart")[0]);
    }
  }, [data]);

  useEffect(() => {
    if (chart.chart) {
      setTime(chart.chart.times);
    }
  }, [chart]);

  useEffect(() => {
    if (chart.chart) {
      setConuts(chart.chart.items);
    }
  }, [chart]);

  useEffect(() => {
    if (counts) {
      setCount1(Object.values(counts)[0]);
    }
  }, [counts]);

  useEffect(() => {
    if (counts) {
      setCount2(Object.values(counts)[1]);
    }
  }, [counts]);

  useEffect(() => {
    if (counts) {
      setCount3(Object.values(counts)[2]);
    }
  }, [counts]);

  const arrTime = time.map((time) => `${time.hour}`);
  arrTime.map((item, index) => {
    if (index % 2 !== 0) {
      arrTime[index] = "";
    }
    return 0;
  });
  const counter1 = count1 && count1.map((count) => count.counter);
  const counter2 = count2 && count2.map((count) => count.counter);
  const counter3 = count3 && count3.map((count) => count.counter);

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
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    tension: 0.3,
    scales: {
      y: {
        display: false,
        ticks: {
          stepSize: 5000,
        },
      },
    },
  };

  const labels = arrTime;

  const dataChart = {
    labels,
    datasets: [
      {
        data: counter1,
        borderColor: "#4a90e2",
        backgroundColor: "#4a90e2",
      },
      {
        data: counter2,
        borderColor: "#50e3c2",
        backgroundColor: "#50e3c2",
      },
      {
        data: counter3,
        borderColor: "#e35050",
        backgroundColor: "#e35050",
      },
    ],
  };

  const classes = clsx(styles.zingChartIndex, styles.zingChartIndex1);
  const classes1 = clsx(styles.zingChartIndex, styles.zingChartIndex2);
  const classes2 = clsx(styles.zingChartIndex, styles.zingChartIndex3);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className={styles.zingChart}>
      <div className={styles.zingChartWrapper}>
        <Link className={styles.zingChartLink} to="/zingchart">
          #zingchart
        </Link>
        <button className={styles.zingChartbutton}>
          <FontAwesomeIcon
            className={styles.zingChartIcon}
            icon="fa-solid fa-play"
          />
        </button>
      </div>
      <Container>
        <Row>
          <Col md={12} lg={4}>
            {chart.items &&
              chart.items.map((item, index) => (
                <div key={index}>
                  {index > 2 ? (
                    <></>
                  ) : (
                    <div className={styles.zingChartSong}>
                      <div className={styles.zingChartBox}>
                        <div
                          className={
                            index === 0
                              ? classes
                              : index === 1
                              ? classes1
                              : classes2
                          }
                        >
                          {index + 1}
                        </div>
                        <div className={styles.zingChartMain}>
                          <div className={styles.zingChartThumbPar}>
                            <div
                              className={styles.zingChartThumb}
                              style={{
                                backgroundImage: `url(${item.thumbnailM})`,
                              }}
                            ></div>
                          </div>
                          <div className={styles.zingChartArtitsBox}>
                            <div className={styles.zingChartArtits}>
                              {item.title}
                            </div>
                            <div>
                              {item.artists.map((artist, index) => (
                                <Link
                                  className={styles.zingChartTagA}
                                  key={index}
                                  to={`${artist.link}/${artist.alias}`}
                                  onClick={() =>
                                    handleClickLink(artist.link, "artistdetail")
                                  }
                                >
                                  {index > 0
                                    ? `,${artist.name}`
                                    : `${artist.name}`}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index > 1 ? (
                        <span>
                          {Math.floor(
                            (item.score / chart.chart.totalScore) * 100
                          ) - 1}
                          %
                        </span>
                      ) : (
                        <span>
                          {Math.ceil(
                            (item.score / chart.chart.totalScore) * 100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            <Link to={"/zingchart"} className="zingchart_showall">
              <span>Xem Thêm</span>
            </Link>
          </Col>
          <Col lg={8} className="chart-no-responsive">
            <Line ref={chartRef} options={options} data={dataChart} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RTChartType;
