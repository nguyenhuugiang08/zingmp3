import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "scss/PlaySong.scss";
import PlaySongCenter from "./PlaySongCenter/PlaySongCenter";

function PlaySong() {
  const dataStore = useSelector((state) => state.currentSong);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (dataStore.length !== 0) {
      setMounted(dataStore[dataStore.length - 1].isPlay);
    }
  }, [dataStore]);

  return (
    <div>
      {mounted && (
        <div className="play-song">
          <PlaySongCenter />
        </div>
      )}
    </div>
  );
}

export default PlaySong;
