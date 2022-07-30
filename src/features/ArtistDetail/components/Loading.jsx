import React from 'react'
import Skeleton from 'react-loading-skeleton'

function Loading() {
  return (
    <div>
        <Skeleton baseColor='#231B2E' highlightColor='#231B2E' height={12} width={270} borderRadius={999} />
    </div>
  )
}

export default Loading