import listMVApi from 'api/listMVApi'
import videoApi from 'api/videoApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function MV() {
  const [data, setData] = useState({})
  const { encodeId } = useParams()
  console.log(encodeId)
  useEffect(() => {
    const getListMv = async () => {
      const params = {
        id: encodeId
      }

      const respone =await videoApi.getAll(params)
      setData(respone.data)
    }

    getListMv()
  },[])
  return (
    <div>
        <video style={{width: "1000px"}} autoPlay={true} controls={true} src={`${data.streaming && data.streaming.mp4["720p"]}`}></video>
    </div>
  )
}

export default MV