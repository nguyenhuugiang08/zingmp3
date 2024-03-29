import Home from "features/home";
import Top100 from "features/top100";
import Anbuml from "components/Album";
import Personal from "features/Personal/components/Personal/Personal";
import Zingchart from "features/zingchart";
import Radio from "features/radio";
import Chartdetail from "features/zingchart/components/chartdetail/Chartdetail";
import MV from "features/Mv";
import ArtistDetail from "components/ArtistDetail";
import Follow from "features/Follow/Follow";
import NewMusic from "features/NewMusic";
import Genre from "features/Genre";
import TopicDetail from "features/Genre/components/Topic/TopicDetail/TopicDetail";
import NationsDetail from "features/Genre/components/Nations/NationsDetail";
import Search from "components/Search";
import "scss/content.scss";

import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "components/NotFound";

function Routerall() {
    const path = useSelector((state) => state.link);
    const dataStore = useSelector((state) => state.currentSong);
    const [mounted, setMounted] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        if (dataStore.length !== 0) {
            setMounted(dataStore[dataStore.length - 1].isPlay);
        }
    }, [dataStore]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
        { path: "*", component: NotFound },
    ];

    listPath.map((item) => {
        routes.push(item);
    });

    const mediaQueryMobile = window.matchMedia("(max-width: 739px)");

    return (
        <div
            className='content-app'
            style={{
                marginBottom: `${
                    mounted
                        ? `${mediaQueryMobile.matches ? "62px" : "90px"}`
                        : ""
                }`,
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
