import homeApi from 'api/homeApi'
import React, { useEffect, useState } from 'react'
import Artist from './artistSpotlight/Artist'
import Event from './Event/Event'
import HomeChart from './homeChart/HomeChart'
import Top100Outstanding from './Top100Outstanding/Top100Outstanding'
import ZingchartWeek from './ZingchartWeek/ZingchartWeek'

function HomePage3() {
    const [list, setList] = useState({})

    useEffect(() => {
        const getHomePage3 = async () => {
            try {
                const params = {
                    page: 3
                }
                const response = await homeApi.getAll(params)
                setList(response.data)
            } catch (error) {
                console.log('Falied to fetch data: ', error)
            }
        }

        getHomePage3()
    },[])

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