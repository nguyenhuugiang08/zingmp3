import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeApi } from "../getHomeSlice";

import homeApi from "api/homeApi";
import HomeSilder from "./HomePage1/HomeSilder";
import Homeheard from "./HomeHeard/Homeheard";
import Loading from "./Loading";
import LiveStreamType from "./LiveStreamType";
import PlaylistType from "./PlaylistType";
import EventType from "./EventType";
import NewReleaseType from "./NewReleaseType";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const homeData = useSelector((state) => state.homeData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getHome = async () => {
      try {
        setLoading(true);
        const response = await homeApi.getAll();
        dispatch(getHomeApi(response.data));
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };

    getHome();
  }, []);

  useEffect(() => {
    if (homeData.length > 0) {
      setData(homeData[0].items);
    }
  }, [homeData]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HomeSilder data={data} />
          <Homeheard data={data} />
          <NewReleaseType data={data} />
          <PlaylistType data={data} />
          <LiveStreamType data={data} />
          {data.length > 0 &&
          data.filter((item) => item.sectionType === "event").length > 0 ? (
            <EventType data={data} />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
