
const userDataReducer = (state, action) => {

    switch (action.type) {

        case "USER_ALL_PLAYLIST":
            return {
                ...state,
                playlist: action.payload.playlistVideoData
            }
    }
}

export { userDataReducer }