import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Artist from './artistSpotlight/Artist'
import Event from './Event/Event'
import HomeChart from './homeChart/HomeChart'
import Top100Outstanding from './Top100Outstanding/Top100Outstanding'
import ZingchartWeek from './ZingchartWeek/ZingchartWeek'

function HomePage3() {
    const [list, setList] = useState({})

    const homeData = useSelector(state => state.homeData)

    useEffect(() => {
        if(homeData.length > 0){
            setList(homeData[0].items)
        }
    },[homeData])

  return (
    <div>
        <HomeChart list={list}/>
        <ZingchartWeek list={list}/>
        <Artist list={list}/>
        <Top100Outstanding list={list}/>
        <Event list={list}/>
    </div>
  )
}

export default HomePage3