import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import styles from "scss/Home4.module.scss";
import { loadLink } from "features/linkSlice";
import { useDispatch } from "react-redux";

function HomeChoose({ data }) {
  const [chooses, setChooses] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length !== 0) {
      setChooses(
        data.filter(
          (item) =>
            item.sectionType === "playlist" && item.title === "Cuối Tuần Lên Nhạc"
        )[0]
      );
    }
  }, [data]);

  const handleClickLink = (...rest) => {
    const action = loadLink(rest);
    dispatch(action);
  };

  return (
    <div className="mt-5">
      <div className={styles.home4}>
        <div>
          <div className={styles.home4Tiltle}>{chooses.title || ""}</div>
          <div className={styles.home4Container}>
            <Container fluid>
              <Row xs={2} md={3} lg={4} xl={5}>
                {chooses.items &&
                  chooses.items.map((compo, index) => (
                    <div key={index}>
                      <Col className={styles.home4Col}>
                        <div className={styles.home4Par}>
                          <div
                            className={styles.home4Image}
                            style={{
                              backgroundImage: `url(${compo.thumbnail})`,
                            }}
                          ></div>
                          <div className={styles.home4Child}>
                            <div>
                              <FontAwesomeIcon icon="fa-regular fa-heart" />
                            </div>
                            <Link
                              className={styles.home4Play}
                              to={`${compo.link}/${compo.encodeId}`}
                              onClick={() =>
                                handleClickLink(compo.link, "album")
                              }
                            >
                              <FontAwesomeIcon icon="fa-solid fa-play" />
                            </Link>
                            <div>
                              <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.home4Title}>{compo.title}</div>
                        <div className={styles.home4SortDescription}>
                          {compo.sortDescription}
                        </div>
                      </Col>
                    </div>
                  ))}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeChoose;
