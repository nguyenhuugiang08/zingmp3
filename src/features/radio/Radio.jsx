import radioApi from 'api/radioApi'
import HomeRadio from 'features/home/components/HomeRadio/HomeRadio'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RadioEpisode from './RadioEpisode/RadioEpisode'
import RadioPostcard from './RadioPodcast/RadioPostcard'
import RadioPostcardCategory from './RadioPostcardCategory/RadioPostcardCategory'
import RadioPostcardH from './RadioPostcardH/RadioPostcardH'
import RadioSchedule from './RadioSchedule/RadioSchedule'
import { getRadio } from './radioSlice'

function Radio() {
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const homeData = useSelector(state => state.homeData)
  const radioData = useSelector(state => state.radio)

  const dispatch = useDispatch()

  useEffect(() => {
    const getRadioData = async () => {
      try {
        setLoading(true)
        const response = await radioApi.getAll()
        dispatch(getRadio(response.data))
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }
    getRadioData()
  }, [])

  useEffect(() => {
    if (homeData.length > 0) {
      setData(homeData[0].items)
    }
  }, [homeData])

  useEffect(() => {
    if (radioData.length > 0) {
      setList(radioData[0].items)
    }
  }, [radioData])

  return (
    <div>
      {loading ? <div>Loading ...</div> :
        <div>
          <HomeRadio data={data} />
          <RadioSchedule />
          {list.length > 0 && list.filter(item => item.sectionType === 'podcast_category').length > 0 ? <RadioPostcardCategory list={list} /> : <></>}
          {list.length > 0 && list.filter(item => item.sectionType === 'episode').length > 0 ? <RadioEpisode list={list} /> : <></>}
          {list.length > 0 && list.filter(item => item.sectionType === 'podcastH').length > 0 ? <RadioPostcardH list={list} /> : <></>}
          {list.length > 0 && list.filter(item => item.sectionType === 'podcast').length > 0 ? <RadioPostcard list={list} /> : <></>}
        </div>
      }
    </div>
  )
}

export default Radio