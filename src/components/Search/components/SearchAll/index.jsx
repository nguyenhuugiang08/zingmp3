import React from "react";
import ArtistType from "./ArtistType";
import PlaylistType from "./PlaylistType";
import SongType from "./SongType";
import VideoType from "./VideoType";

function SearchAll({ data }) {
  return (
    <div className="mt-4">
      {data.songs ? <SongType list={data.songs} /> : <></>}
      {data.playlists ? <PlaylistType list={data.playlists} /> : <></>}
      {data.videos ? <VideoType list={data.videos} /> : <></>}
      {data.artists ? <ArtistType list={data.artists} /> : <></>}
    </div>
  );
}

export default SearchAll;
