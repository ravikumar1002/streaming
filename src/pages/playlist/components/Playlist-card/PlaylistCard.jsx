import "./playlist-card.css"

export const PlaylistCard = ({ videoPlaylist }) => {
    console.log(videoPlaylist)
    const findFirstVideoImg = (videos) => {
        return videos[0]._id
    }
    return (
        <div>
            <div className="playlist-card-top">
                <div>
                    {videoPlaylist?.videos.length > 0 ?
                        <img src={`https://i.ytimg.com/vi/${findFirstVideoImg(videoPlaylist.videos)}/maxresdefault.jpg`} alt="" /> :
                        <img src={`https://i.ytimg.com/vi/sdsdfsfdsvfs/maxresdefault.jpg`} alt="" />
                    }
                </div>
                <div className="playlist-card-count-section">
                    <p>{videoPlaylist?.videos.length}</p>
                </div>

            </div>
            <div className="playlist-card-tilte-section">
                <div>
                    <p>{videoPlaylist.title}</p>
                </div>
            </div>
        </div>
    )
}