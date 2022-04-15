import { useState } from "react"

export const VideoCardMenu = () => {

    const [showVideoMenuContent, setShowVideoMenuContent] = useState(false)

    return (
        <>
            <button onClick={() => setShowVideoMenuContent(!showVideoMenuContent)}><i className="fa-solid fa-ellipsis-vertical btn-sm"></i></button>
            {showVideoMenuContent && <div className="toggle-video-menu">
                <div><span>Save to Watch Later</span></div>
                <div>Save to Playlist</div>
            </div>
            }
        </>
    )
}
