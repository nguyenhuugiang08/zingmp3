import homeApi from "api/homeApi";
import radioApi from "api/radioApi";
import HomeRadio from "features/home/components/LiveStreamType";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import RadioEpisode from "./RadioEpisode/RadioEpisode";
import RadioPostcard from "./RadioPodcast/RadioPostcard";
import RadioPostcardCategory from "./RadioPostcardCategory/RadioPostcardCategory";
import RadioPostcardH from "./RadioPostcardH/RadioPostcardH";
import RadioSchedule from "./RadioSchedule/RadioSchedule";

function Radio() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRadioData = async () => {
      try {
        setLoading(true);
        const response = await radioApi.getAll();
        setList(response.data.items);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };
    getRadioData();
  }, []);

  useEffect(() => {
    const getHome = async () => {
      try {
        setLoading(true);
        const response = await homeApi.getAll();
        setData(response.data.items);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };

    getHome();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <HomeRadio data={data} />
          <RadioSchedule />
          {list.length > 0 &&
          list.filter((item) => item.sectionType === "podcast_category")
            .length > 0 ? (
            <RadioPostcardCategory list={list} />
          ) : (
            <></>
          )}
          {list.length > 0 &&
          list.filter((item) => item.sectionType === "episode").length > 0 ? (
            <RadioEpisode list={list} />
          ) : (
            <></>
          )}
          {list.length > 0 &&
          list.filter((item) => item.sectionType === "podcastH").length > 0 ? (
            <RadioPostcardH list={list} />
          ) : (
            <></>
          )}
          {list.length > 0 &&
          list.filter((item) => item.sectionType === "podcast").length > 0 ? (
            <RadioPostcard list={list} />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default Radio;
