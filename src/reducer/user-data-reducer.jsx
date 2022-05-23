
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
        case "LOGOUT":
            return {
                playlist: [],
                watchLater: [],
                liked: [],
                history: [],
                uploadedVideo: [],
            }

        case "UPLOADED_VIDEO":
            return {
                ...state,
                uploadedVideo: action.payload.uploadVideo
            }

        case "login":
            return {
                playlist: action.payload.loginData.playlists,
                watchLater: action.payload.loginData.watchlater,
                liked: action.payload.loginData.likes,
                history: action.payload.loginData.history
            }
    }
}

export { userDataReducer }