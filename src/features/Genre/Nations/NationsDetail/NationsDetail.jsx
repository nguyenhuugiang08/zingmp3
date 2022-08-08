import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hubDetailApi from 'api/hubDetailApi';
import NationsPlaylistType from './NationsPlaylistType/NationsPlaylistType';
import LoadingTypeDetail from 'features/Genre/LoadingTypeDetail';

function NationsDetail() {
    const { encodeId } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getHubDetil = async () => {
            try {
                const params = {
                    id: encodeId,
                }
                setLoading(true)
                const response = await hubDetailApi.getAll(params)
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.log('failed to fetch data', error)
            }
        }
        getHubDetil()
    }, [encodeId])

    return (
        <div>
            {loading ? <LoadingTypeDetail /> :
                <div>
                    {data.sections && data.sections.filter(section => section.sectionType === 'playlist').length > 0 ? <NationsPlaylistType data={data} /> : <></>}
                </div>
            }
        </div>
    )
}

export default NationsDetail