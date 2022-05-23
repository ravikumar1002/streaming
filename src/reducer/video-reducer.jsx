import { useEffect } from "react"

const videoReducer = (state, action) => {

    switch (action.type) {
        case "GET_ALL_VIDEOS_FROM_SERVER":
            return {
                ...state,
                allVideos: action.payload.videos
            }

        case "UPLOAD_VIDEO":
        return {
         ...state, 
         allVideos : [...state.allVideos , action.payload.video]
        }
    }
}

export { videoReducer }