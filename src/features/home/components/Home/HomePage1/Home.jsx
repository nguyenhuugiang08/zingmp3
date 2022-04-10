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

function Home() {
  const [data, setData] = useState({})
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getHome = async () => {
      try {
        const params = {
          page: 1
        }
        setLoading(true)
        const response = await homeApi.getAll(params)
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }

    getHome()
  }, [])

  useEffect(() => {
    if (data.items) {
      setList(data.items)
    }
  }, [data])
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