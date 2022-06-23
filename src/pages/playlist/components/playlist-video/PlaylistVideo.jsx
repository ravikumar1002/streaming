import { useUserData } from "../../../../context/user-data-context"
import { deleteVideoInPLaylist } from "../../../../services"
import { useAuth } from "../../../../context/auth-context"
import "./playlist-video.css"
import { Link } from "react-router-dom"
export const PlaylistVideo = ({ video, playlistIdForVideo }) => {
    const { userDataState, userDataDispatch } = useUserData()
    const { token } = useAuth()

    const sortDescription = (description) => {
        return description.slice(0,40)+ "..."
    }


    return (
        <div>
            <Link to={`/videos/${video._id}`} className="video-card-link">
                <div>
                    <img src={`https://i.ytimg.com/vi/${video._id}/maxresdefault.jpg`} alt={video.title} />
                </div>
                <div className="playlist-video-title">
                    <h3>{video.title}</h3>
                    <span className="fa fa-trash playlist-video-icon" onClick={() => {
                        deleteVideoInPLaylist(playlistIdForVideo, video._id, token, userDataState, userDataDispatch)
                    }}></span>
                </div>
                <div>
                    <small className="fs-x-sm">{sortDescription(video.description)}</small>
                </div>
            </Link>
            
        </div>
    )
}