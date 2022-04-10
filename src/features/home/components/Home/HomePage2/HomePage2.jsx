import homeApi from 'api/homeApi'
import React, { useEffect, useState } from 'react'
import HomeNewMusic from './HomeNewMusic/HomeNewMusic'
import HomeRadio from './HomeRadio/HomeRadio'

function HomePage2() {
    const [data, setData] = useState({})

    useEffect(() => {
        const getRadio = async () => {
            try {
                const params = {
                    page: 2
                }
                const response = await homeApi.getAll(params)
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch data: ', error)
            }
        }

        getRadio()
    }, [])
  return (
    <div>
            <HomeRadio data={data}/>
            <HomeNewMusic data={data}/>
    </div>
  )
}

export default HomePage2