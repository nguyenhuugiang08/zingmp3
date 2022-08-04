import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hubDetailApi from 'api/hubDetailApi';
import NationsPlaylistType from './NationsPlaylistType/NationsPlaylistType';

function NationsDetail() {
    const { encodeId } = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        const getHubDetil = async () => {
            try {
                const params = {
                    id: encodeId,
                }
                const response = await hubDetailApi.getAll(params)
                setData(response.data)
            } catch (error) {
                console.log('failed to fetch data', error)
            }
        }
        getHubDetil()
    }, [encodeId])

    return (
        <div>
            {data.sections && data.sections.filter(section => section.sectionType === 'playlist').length > 0 ? <NationsPlaylistType data={data} /> : <></>}
        </div>
    )
}

export default NationsDetail