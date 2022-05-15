import App from 'App'
import Home from 'features/home/components/Home/HomePage1/Home'
import Personal from 'features/Personal/components/Personal/Personal'
import Anbuml from 'features/top100/components/pages/Album'
import Top100 from 'features/top100/components/top100/Top100'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const routes = [
  {
    path: "/",
    component: "home",
    route: [
      {
        path: "Top100",
        component: "Top100"
      },
      {
        path: "Personal",
        component: "Personal"
      },
      {
        path: "Zingchat",
        component: "Zingchart"
      },
      {
        path: "Radio",
        component: "Radio"
      },
      {
        path: "Follow",
        component: "Follow"
      },
      {
        path: "Zingchat",
        component: "Zingchart"
      },
      {
        path: "Zingchat",
        component: "Zingchart"
      }
    ]
  }
]

const RouterAll = () => {
  const path = useSelector(state => state.link)

  return (
   <BrowserRouter>
        <Routes>
            <Route path = "/"  element={<App/>}>
              <Route index element={<Home/>}></Route>
              <Route path="Top100" element={<Top100/>}></Route>
              <Route path={`${path[path.length - 1]}/:encodeId`} element={<Anbuml />}></Route>
              <Route path="personal" element={<Personal/>}></Route>
            </Route>
        </Routes>
   </BrowserRouter>
  )
}

export default RouterAll