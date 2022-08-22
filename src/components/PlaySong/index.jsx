import PlaySongMobile from "components/PlaySongMoblile";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "scss/PlaySong.scss";
import "scss/_playsongmobile.scss";
import PlaySongCenter from "./PlaySongCenter";

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
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            zIndex: "101",
          }}
        >
          <div className="play-song">
            <PlaySongCenter />
          </div>
          <div className="play-song-mobile">
            <PlaySongMobile />
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaySong;
