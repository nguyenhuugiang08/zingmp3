import homeApi from 'api/homeApi'
import React, { useEffect, useState } from 'react'
import HomePublish from './HomePublish/HomePublish'

function HomePage4() {
    const [data ,setData] = useState({})
    useEffect(() => {
        const getHomePage4 = async () => {
            try {
                const params = {
                    page: 4
                }
                const response = await homeApi.getAll(params)
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch data: ' , error)
            }
        }

        getHomePage4()
    },[])

  return (
    <div>
        <HomePublish data={data}/>
    </div>
  )
}

export default HomePage4