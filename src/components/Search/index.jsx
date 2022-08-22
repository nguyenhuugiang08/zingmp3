import React, { useEffect, useState } from "react";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import searchApi from "api/searchApi";
import SearchTypeVideo from "./SearchTypeVideo";
import SearchAll from "./SearchAll";
import SearchTypeSong from "./SearchTypeSong";
import SearchtypePlaylist from "./SearchTypePlaylist";
import SearchTypeArtist from "./SearchTypeArtist";
import Loading from "./Loading";

function Search() {
  const { search } = useLocation();
  const query = parse(search);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("all");

  useEffect(() => {
    const getDataSearchAll = async () => {
      try {
        const params = {
          keyword: query.q,
        };
        setLoading(true);
        const response = await searchApi.getAll(params);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("falied to fetch data", error);
      }
    };
    getDataSearchAll();
  }, [query.q]);

  const handleFilter = (e, role) => {
    let filterElement = document.querySelectorAll(".wrapper-filter--item");
    filterElement.forEach((element) => {
      element.style.border = "none";
    });
    e.target.style.borderBottom = "2px solid #7200a1";
    setType(
      role === "all"
        ? "all"
        : role === "song"
        ? "song"
        : role === "playlist"
        ? "playlist"
        : role === "artist"
        ? "artist"
        : "video"
    );
  };

  return (
    <div className="mv">
      <div>
        <div className="wrapper search-wrapper">
          <div
            className="wrapper-filter search-wrapper-title wrapper-mv"
            style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
          >
            Kết Quả Tìm Kiếm
          </div>
          <div className="search-wrapper-filter d-flex">
            <div
              className="wrapper-filter search-wrapper-filter--item wrapper-filter--item wrapper-vn wrapper--active"
              onClick={(e) => handleFilter(e, "all")}
            >
              Tất cả
            </div>
            <div
              className="wrapper-filter search-wrapper-filter--item wrapper-filter--item wrapper-usuk"
              onClick={(e) => handleFilter(e, "song")}
            >
              bài hát
            </div>
            <div
              className="wrapper-filter search-wrapper-filter--item wrapper-filter--item wrapper-kpop"
              onClick={(e) => handleFilter(e, "playlist")}
            >
              playlist/album
            </div>
            <div
              className="wrapper-filter search-wrapper-filter--item wrapper-filter--item wrapper-concert"
              onClick={(e) => handleFilter(e, "artist")}
            >
              nghệ sĩ/oa
            </div>
            <div
              className="wrapper-filter search-wrapper-filter--item wrapper-filter--item wrapper-concert"
              onClick={(e) => handleFilter(e, "mv")}
            >
              mv
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {type === "all" ? <SearchAll data={data} /> : <></>}
          {type === "video" ? (
            <SearchTypeVideo keyword={query.q} type={type} />
          ) : (
            <></>
          )}
          {type === "song" ? (
            <SearchTypeSong keyword={query.q} type={type} />
          ) : (
            <></>
          )}
          {type === "playlist" ? (
            <SearchtypePlaylist keyword={query.q} type={type} />
          ) : (
            <></>
          )}
          {type === "artist" ? (
            <SearchTypeArtist keyword={query.q} type={type} />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
