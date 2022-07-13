import Home from 'features/home/components/Home/HomePage1/Home';
import Top100 from 'features/top100/components/top100/Top100';
import Anbuml from 'features/top100/components/pages/Album';
import Personal from 'features/Personal/components/Personal/Personal';
import Zingchart from 'features/zingchart/components/Zingchart';
import Radio from 'features/radio/Radio';
import Chartdetail from 'features/zingchart/components/chartdetail/Chartdetail';
import MV from 'features/Mv/components/MV';
import ArtistDetail from 'features/ArtistDetail/components/ArtistDetail';

import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Routerall() {
  const path = useSelector(state => state.link)
  const dataStore = useSelector(state => state.top100)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
      if (dataStore.length !== 0) {
          setMounted(dataStore[dataStore.length - 1].isPlay)
      }
  }, [dataStore])

  const routes = [
    { path: "/", component: Home },
    { path: "top100", component: Top100, },
    { path: `${path[path.length - 1]}/:encodeId`, component: Anbuml },
    { path: `${path.length > 0 && path[path.length - 1][1] === 'chart' && path[path.length - 1][0]}/:encodeId`, component: Chartdetail },
    { path: `${path.length > 0 && path[path.length - 1][1] === 'artistdetail' && path[path.length - 1][0]}/:encodeId`, component: ArtistDetail },
    { path: `${path.length > 0 && path[path.length - 1][1] === 'mv' && path[path.length - 1][0]}/:encodeId`, component: MV },
    { path: "personal", component: Personal },
    { path: "zingchart", component:  Zingchart },
    { path: "radio", component: Radio },
    { path: "follow", component: "Follow" },
    { path: "MV", component: MV },
  ]

  return (
    <div style={{ width: 'calc(100% - 240px)', position: 'relative', left: '240px', padding: '70px 60px 0', top: '0', marginBottom: `${mounted ? "90px" : ""}`}}>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.component
          return <Route key={index} path={route.path} element={<Page />}></Route>
        })}
      </Routes>
    </div >
  )
}

export default Routerall
