
const userDataReducer = (state, action) => {

    switch (action.type) {

        case "USER_ALL_PLAYLIST":
            return {
                ...state,
                playlist: action.payload.playlistVideoData
            }

        case "WATCH_LATER_VIDEOS":
            return {
                ...state,
                watchLater: action.payload.watchLaterVideos
            }

        case "LIKED_VIDEOS":
            return {
                ...state,
                liked: action.payload.likedVideos
            }
        
            case "HISTORY_VIDEOS":
                return {
                    ...state,
                    history: action.payload.historyVideoData
                }
    }
}

export { userDataReducer }