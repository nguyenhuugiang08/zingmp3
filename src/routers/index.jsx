import Home from "features/home/components";
import Top100 from "features/top100/components/top100";
import Anbuml from "components/Album";
import Personal from "features/Personal/components/Personal/Personal";
import Zingchart from "features/zingchart";
import Radio from "features/radio/Radio";
import Chartdetail from "features/zingchart/components/chartdetail/Chartdetail";
import MV from "features/Mv/components/MV";
import ArtistDetail from "components/ArtistDetail";
import Follow from "features/Follow/Follow";
import NewMusic from "features/NewMusic/NewMusic";
import Genre from "features/Genre/Genre";
import TopicDetail from "features/Genre/Topic/TopicDetail/TopicDetail";
import NationsDetail from "features/Genre/Nations/NationsDetail/NationsDetail";
import Search from "components/Search";
import "scss/content.scss";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function Routerall() {
    const path = useSelector((state) => state.link);
    const dataStore = useSelector((state) => state.currentSong);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (dataStore.length !== 0) {
            setMounted(dataStore[dataStore.length - 1].isPlay);
        }
    }, [dataStore]);

    const listPath = path.map((path) => {
        return {
            path: `${path[0]}/:encodeId`,
            component:
                path[1] === "chart"
                    ? Chartdetail
                    : path[1] === "artistdetail"
                    ? ArtistDetail
                    : path[1] === "mv"
                    ? MV
                    : path[1] === "hubdetail"
                    ? TopicDetail
                    : path[1] === "nationdetail"
                    ? NationsDetail
                    : Anbuml,
        };
    });

    const routes = [
        { path: "/", component: Home },
        { path: "top100", component: Top100 },
        { path: "personal", component: Personal },
        { path: "zingchart", component: Zingchart },
        { path: "radio", component: Radio },
        { path: "the-loai-nghe-si", component: Follow },
        { path: "MV", component: MV },
        { path: "new-music", component: NewMusic },
        { path: "genre", component: Genre },
        { path: `tim-kiem/tat-ca`, component: Search },
    ];

    listPath.map((item) => {
        routes.push(item);
    });

    const mediaQueryMobile = window.matchMedia("(max-width: 739px)")

    return (
        <div
            className="content-app"
            style={{
                marginBottom: `${mounted ? `${mediaQueryMobile.matches ? "62px" : "90px"}` : ""}`,
            }}
        >
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Page />}
                        ></Route>
                    );
                })}
            </Routes>
        </div>
    );
}

export default Routerall;
