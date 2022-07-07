import React, { useEffect, useState } from 'react'
import HomeNewMusic from './HomeNewMusic/HomeNewMusic'
import HomeRadio from './HomeRadio/HomeRadio'

import { useSelector } from 'react-redux'

function HomePage2() {
    const [data, setData] = useState([])
    const homeData = useSelector(state => state.homeData)

    useEffect(() => {
        if(homeData.length > 0){
            setData(homeData[0].items)
        }
    },[homeData])

  return (
    <div>
            <HomeRadio data={data}/>
            <HomeNewMusic data={data}/>
    </div>
  )
}

export default HomePage2