import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HomePublish from './HomePublish/HomePublish'

function HomePage4() {
    const [data ,setData] = useState([])

    const homeData = useSelector(state => state.homeData)

    useEffect(() => {
        if(homeData.length > 0){
            setData(homeData[0].items)
        }
    },[homeData])
  return (
    <div>
        <HomePublish data={data}/>
    </div>
  )
}

export default HomePage4