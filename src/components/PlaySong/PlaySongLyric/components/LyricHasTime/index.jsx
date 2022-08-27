import React, { useEffect, useRef, useState } from "react";

function LyricHasTime({ sentences, scrollDistance, time }) {
    const [lyrics, setLyrics] = useState([]);

    const sentencesRef = useRef();

    useEffect(() => {
        if (Array.isArray(sentences)) {
            setLyrics(sentences);
        } 
    }, [sentences]);

    const handleAutoScroll = (index) => {
        if (sentencesRef.current) {
            sentencesRef.current.parentElement.scrollTop =
                scrollDistance * index;
        }
    };
    return (
        <>
            {lyrics.map((sentence, index) => (
                <div
                    key={index}
                    ref={sentencesRef}
                    className={`play-song-lyric__center-sentences
                      ${
                          index >= 1 &&
                          (
                              sentence.words[sentence.words.length - 1]
                                  .endTime / 1000
                          ).toFixed(3) -
                              time.toFixed(3) <
                              0.1
                              ? handleAutoScroll(index)
                              : ""
                      }
                    `}
                >
                    {sentence.words.map((word, index) => (
                        <div
                            key={index}
                            className={`play-song-lyric__center-words
                            ${
                                (word.startTime / 1000).toFixed(3) -
                                    time.toFixed(3) <
                                0.1
                                    ? "play-song-lyric__center-words--active"
                                    : ""
                            }`}
                        >
                            {`${word.data}`}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default LyricHasTime;
