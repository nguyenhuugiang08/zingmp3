import { configureStore } from '@reduxjs/toolkit';
import top100Reducer from 'features/top100/top100Slice';
import linkReducer from "features/linkSlice";
import homeReducer from "features/home/getHomeSlice";
import zingchartReducer from "features/zingchart/getZingchartSlice";
import playlistReducer from "features/zingchart/components/getPlaylistData";
import idReducer from "features/home/components/HomePage1/getidSlice";
import lyricReducer from "components/PlaySong/getLyric";
import artistReducer from "features/ArtistDetail/getiArtistSlice";
import radioReducer from 'features/radio/radioSlice';
import mvReducer from 'features/Mv/getMvData';

const rootReducer = {
    top100: top100Reducer,
    link: linkReducer,
    homeData: homeReducer,
    zingchartData: zingchartReducer,
    playlist: playlistReducer,
    id: idReducer,
    lyric: lyricReducer,
    artist: artistReducer,
    radio: radioReducer,
    mv :mvReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store