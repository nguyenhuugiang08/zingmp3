import Home from 'features/home/components/Home/HomePage1/Home'
import Top100 from 'features/top100/components/top100/Top100'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Anbuml from '../../features/top100/components/pages/Anbuml'


function Content() {
    return (
        <div style={{width: 'calc(100% - 240px)', position: 'relative', left: '240px', padding: '70px 60px 0'}}>
            <Routes>  
                <Route path='/top100' element={<Top100/>}></Route>
                <Route path='/' element={<Home/>}></Route>
                <Route path='album/Top-100-Bai-Hat-Nhac-Tre-Hay-Nhat-ERIK-Khac-Viet-Chau-Khai-Phong-Le-Bao-Binh/ZWZB969E.html' element={<Anbuml/>}></Route>
            </Routes>
        </div>
    )
}

export default Content
