import Home from 'features/home/components/Home/HomePage1/Home'
import Top100 from 'features/top100/components/top100/Top100'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Anbuml from '../../features/top100/components/pages/Album'


function Content() {
    const path = useSelector(state => state.link)
    return (
        <div style={{ width: 'calc(100% - 240px)', position: 'relative', left: '240px', padding: '70px 60px 0', top: '0' }}>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='top100' element={<Top100 />}></Route>
                <Route path={`${path[path.length - 1]}/:encodeId`} element={<Anbuml />}></Route>
            </Routes>
        </div >
    )
}

export default Content
