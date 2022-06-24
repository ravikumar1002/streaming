import "./playlist-card.css"

export const PlaylistCard = ({ videoPlaylist, deletePlaylistFromServer , token, userDataDispatch}) => {
    const findFirstVideoImg = (videos) => {
        return videos[0]._id
    }
    return (
        <div>
            <div className="playlist-card-top">
                <div>
                    {videoPlaylist?.videos.length > 0 ?
                        <img src={`https://i.ytimg.com/vi/${findFirstVideoImg(videoPlaylist.videos)}/maxresdefault.jpg`} alt={videoPlaylist.title} /> :
                        <img src={`https://i.ytimg.com/vi/sdsdfsfdsvfs/maxresdefault.jpg`} alt="empty-playlist-image" style={{maxHeight: "186px"}}/>
                    }
                </div>
                <div className="playlist-card-count-section">
                    <p>{videoPlaylist?.videos.length}</p>
                </div>
            </div>
            <div className="playlist-card-tilte-section p-1">              
                    <p className="fs-md fw-700">{videoPlaylist.title}</p>
                    <div onClick={(e) => {
                        e.preventDefault()
                        deletePlaylistFromServer(videoPlaylist._id, token, userDataDispatch)
                    }}
                    >
                        <i className="fa fa-trash fs-md mr-1" ></i>
                    </div>               
            </div>
        </div>
    )
}