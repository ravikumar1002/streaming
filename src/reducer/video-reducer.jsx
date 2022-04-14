import { useEffect } from "react"

const videoReducer = (state, action) => {

    switch (action.type) {
        case "GET_ALL_VIDEOS_FROM_SERVER":
            return {
                ...state,
                allVideos: action.payload.videos
            }
    }
}

export { videoReducer }