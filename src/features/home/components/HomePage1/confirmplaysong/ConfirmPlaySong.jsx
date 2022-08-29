import infoSongApi from "api/infoSongApi";
import React, { useEffect, useState } from "react";
import "scss/confirmplaysong.scss";

function ConfirmPlaySong({ encodeId }) {
    const [infoSong, setInfoSong] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getInfoSong = async () => {
            try {
                const params = {
                    id: encodeId,
                };
                setLoading(true);
                const respone = await infoSongApi.getAll(params);
                setInfoSong(respone.data);
                setLoading(false);
            } catch (error) {
                console.log("error", error);
            }
        };
        getInfoSong();

        return () => {
            setInfoSong({});
        };
    }, [encodeId]);

    return (
        <div className='modal-overlay'>
            <div className='confirmplaysong'>
                <div className='confirmplaysong_wrapper'>
                    <div>
                        Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ
                        bị thay thế.
                    </div>
                    <div className='confirmplaysong_wrapper_img'>
                        {loading ? (
                            <>Loading...</>
                        ) : (
                            <div
                                style={{
                                    backgroundImage: `url(${
                                        infoSong && infoSong.thumbnailM
                                    })`,
                                }}
                            ></div>
                        )}
                    </div>
                    <div>{infoSong && infoSong.title}</div>
                    <div className='confirmplaysong_wrapper_artist'>
                        {infoSong && infoSong.artistsNames}
                    </div>
                    <div
                        className='confirmplaysong_wrapper_play'
                        id='modal-play'
                    ></div>
                    <div className='confirmplaysong_wrapper_addplaylist'>
                        THÊM VÀO DANH SÁCH PHÁT
                    </div>
                    <div id='modal-close'></div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPlaySong;
