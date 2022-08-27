import React, { useEffect, useRef, useState } from "react";

function LyricNoTime({ sentences }) {
    const [lyrics, setLyrics] = useState([]);

    const sentencesRef = useRef();

    useEffect(() => {
        if (!Array.isArray(sentences)) {
            const newList = sentences.split('\n');
            setLyrics(newList);
        } 
    }, [sentences]);

    return (
        <div>
            {lyrics.map((sentence, index) => (
                <div
                    key={index}
                    ref={sentencesRef}
                    className={`play-song-lyric__center-sentences`}
                >
                    {sentence}
                </div>
            ))}
        </div>
    );
}

export default LyricNoTime;