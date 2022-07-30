import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import top100Reducer from 'features/top100/top100Slice';
import linkReducer from "features/linkSlice";
import homeReducer from "features/home/getHomeSlice";
import zingchartReducer from "features/zingchart/getZingchartSlice";
import playlistReducer from "features/zingchart/components/getPlaylistData";
import idReducer from "features/home/components/HomePage1/getidSlice";
import lyricReducer from "components/PlaySong/getLyric";
import artistReducer from "features/ArtistDetail/getiArtistSlice";
import radioReducer from 'features/radio/radioSlice';
import mountedReducer from 'features/Mv/getEncodeId';

const rootReducer = combineReducers({
    top100: top100Reducer,
    link: linkReducer,
    homeData: homeReducer,
    zingchartData: zingchartReducer,
    playlist: playlistReducer,
    id: idReducer,
    lyric: lyricReducer,
    artist: artistReducer,
    radio: radioReducer,
    mounted: mountedReducer,
})

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store