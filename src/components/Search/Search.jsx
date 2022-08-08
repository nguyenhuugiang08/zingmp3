import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import searchApi from 'api/searchApi';
import SearchTypeVideo from './SearchTypeVideo/SearchTypeVideo';

function Search() {
  const { search } = useLocation();
  const query = parse(search);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const getDataSearchAll = async () => {
      try {
        const params = {
          q: query.q,
        }
        setLoading(true);
        const response = await searchApi.getAll(params);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('falied to fetch data', error)
      }
    }
    getDataSearchAll();
  }, [query.q])

  const handleFilter = (e, role) => {
    let filterElement = document.querySelectorAll('.wrapper-filter--item');
    filterElement.forEach((element) => {
      element.style.border = 'none';
    })
    e.target.style.borderBottom = '2px solid #7200a1';
    setType(role === 'all' ? 'all' : (role === 'song' ? 'song' :
      (role === 'playlist' ? 'playlist' : (role === 'artist' ? 'artist' : 'video'))))
    const list = []
    setData(list)
  }

  return (
    <div className='mv'>
      <div >
        <div className='wrapper'>
          <div className='wrapper-filter wrapper-mv' style={{ textTransform: 'capitalize', fontSize: '1.6rem' }}>Kết Quả Tìm Kiếm</div>
          <div className='wrapper-filter wrapper-filter--item wrapper-vn ms-4 wrapper--active'
            onClick={e => handleFilter(e, 'all')}>
            Tất cả
          </div>
          <div className='wrapper-filter wrapper-filter--item wrapper-usuk ms-5'
            onClick={e => handleFilter(e, 'song')}>
            bài hát
          </div>
          <div className='wrapper-filter wrapper-filter--item wrapper-kpop ms-5'
            onClick={e => handleFilter(e, 'playlist')}>
            playlist/album
          </div>
          <div className='wrapper-filter wrapper-filter--item wrapper-concert ms-5'
            onClick={e => handleFilter(e, 'artist')}>
            nghệ sĩ/oa
          </div>
          <div className='wrapper-filter wrapper-filter--item wrapper-concert ms-5'
            onClick={e => handleFilter(e, 'mv')}>
            mv
          </div>
        </div>
      </div>
      {loading ? <div>loading...</div> :
        (type === 'video' ? <SearchTypeVideo keyword={query.q} type = {type} /> : <></>)
      }
    </div>
  )
}

export default Search