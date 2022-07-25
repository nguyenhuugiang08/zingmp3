import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import homeApi from 'api/homeApi'
import HomeSilder from './HomePage1/HomeSilder'
import HomeChoose from './HomeChoose/HomeChoose'
import HomeXnor from './HomeXnor/HomeXnor'
import Homeheard from './HomeHeard/Homeheard'
import Loading from './Loading'
import { getHomeApi } from '../getHomeSlice'
import HomeChart from './homeChart/HomeChart'
import HomeRadio from './HomeRadio/HomeRadio'
import HomeNewMusic from './HomeNewMusic/HomeNewMusic'
import ZingchartWeek from './ZingchartWeek/ZingchartWeek'
import Top100Outstanding from './Top100Outstanding/Top100Outstanding'
import Artist from './artistSpotlight/Artist'
import Event from './Event/Event'
import NewRelease from './NewRelease/NewRelease'
import FavoriteArtist from './FavoriteArtist/FavoriteArtist'

function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const homeData = useSelector(state => state.homeData)
  const dispatch = useDispatch()

  useEffect(() => {
    const getHome = async () => {
      try {
        setLoading(true)
        const response = await homeApi.getAll()
        dispatch(getHomeApi(response.data))
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }

    getHome()
  }, [])

  useEffect(() => {
    if (homeData.length > 0) {
      setData(homeData[0].items)
    }
  }, [homeData])
  return (
    <div>
      {loading ? <Loading /> :
        (<>
          <HomeSilder data={data} />
          <Homeheard data={data} />
          <NewRelease data={data} />
          <HomeChoose data={data} />
          <FavoriteArtist data={data} />
          <HomeChart data={data} />
          <ZingchartWeek data={data} />
          <Artist data={data} />
          <Top100Outstanding data={data} />
          <HomeNewMusic data={data} />
          <HomeXnor data={data} />
          <HomeRadio data={data} />
          {data.length > 0 && data.filter(item => item.sectionType === 'event').length > 0 ? <Event data={data} /> : <></>}
        </>)
      }
    </div>
  )
}

export default Home