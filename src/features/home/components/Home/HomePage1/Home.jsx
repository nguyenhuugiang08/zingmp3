import React, { useEffect, useState } from 'react'
import homeApi from 'api/homeApi'
import HomeSilder from './HomeSlider/HomeSilder'
import HomeChoose from './HomeChoose/HomeChoose'
import HomeXnor from './HomeXnor/HomeXnor'
import Homeheard from './HomeHeard/Homeheard'
import HomePage3 from '../HomePage3/HomePage3'
import HomePage2 from '../HomePage2/HomePage2'
import Loading from '../../Loading'
import HomePage4 from '../HomePage4/HomePage4'
import { getHomeApi } from '../../../getHomeSlice'

import { useDispatch, useSelector } from "react-redux"

function Home() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  
  const homeData = useSelector(state => state.homeData)
  const dispatch = useDispatch()

  useEffect(() => {
    const getHome = async () => {
      try {
        setLoading(true)
        const response = await homeApi.getAll()
        dispatch(getHomeApi(response.data))
        console.log(response.url)
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }

    getHome()
  }, [])

  useEffect(() => {
    if (homeData.length > 0) {
      setList(homeData[0].items)
    }
  }, [homeData])
  return (
    <div>
      {loading ? <Loading /> :
        (<>
          <HomeSilder list={list} />
          <Homeheard list={list} />
          <HomeChoose list={list} />
          <HomeXnor list={list} />
        </>)
      }
      <HomePage2/>
      <HomePage3/>
      <HomePage4/>
    </div>
  )
}

export default Home