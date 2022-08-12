import clsx from "clsx";
import { loadLink } from "features/linkSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import styles from "scss/ZingchartWeek.module.scss";

function ZingchartWeek({ data }) {
  const [week, setWeek] = useState([]);
  const zingchartData = useSelector((state) => state.zingchartData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setWeek(data.filter((item) => item.sectionType === "weekChart")[0].items);
    }
  }, [data]);

  const classes = clsx(styles.banner);
  const linkClasses = clsx(styles.link);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };
  return (
    <div>
      <Container className="pt-5" fluid>
        <Row>
          {week.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={index} className="mb-3">
              <Link
                className={linkClasses}
                to={
                  zingchartData.length > 0 &&
                  `${zingchartData[0].weekChart.us.link}/${zingchartData[0].weekChart.us.playlistId}`
                }
                onClick={() =>
                  handleClickLink(zingchartData[0].weekChart.us.link, "chart")
                }
              >
                <img className={classes} src={item.cover} alt="" />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ZingchartWeek;
