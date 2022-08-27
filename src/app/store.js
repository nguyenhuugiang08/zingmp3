import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import currentSongReducer from "app/currentSongSilce";
import linkReducer from "app/linkSlice";
import zingchartReducer from "app/getZingchartSlice";
import idReducer from "app/getidSlice";
import mountedReducer from "app/getMounted";

const rootReducer = combineReducers({
  currentSong: currentSongReducer,
  link: linkReducer,
  zingchartData: zingchartReducer,
  id: idReducer,
  mounted: mountedReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
