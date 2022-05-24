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

        case "INCREASE_COUNT" : 
        return {
            ...state,
            allVideos: [...action.payload.videos]
        }
    }
}

export { videoReducer }