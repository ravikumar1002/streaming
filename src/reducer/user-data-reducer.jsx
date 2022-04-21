import { useEffect } from "react"

const userDataReducer = (state, action) => {

    switch (action.type) {
       
        case "USER_ALL_PLAYLIST":
        return {
           ...state, 
           playlist: action.payload.playlistVideoData
        }

        case "ADD_PAYLIST_BY_POST": 
        return {
            ...state, 
            playlist: action.payload.postPlaylistData
         }
        
       
    }
}

export { userDataReducer }