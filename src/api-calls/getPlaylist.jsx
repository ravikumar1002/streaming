import axios from "axios";
import { toast } from "react-toastify";

export const getPlaylist = async (token) => {
    try {
        const response = await axios.get("/api/user/playlists", {
            headers: {
                authorization: token
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};


export const postPlaylist = async (playlistItem, authToken) => {
    try {
        const response = await axios.post(`/api/user/playlists`, {
            playlist: {
                title: playlistItem.title
            }
        },
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success("Playlist successfully created")
            return response.data
        }
    } catch (error) {
        toast.error("Something Went Wrong")
        console.log(error);
        throw error
    }
};



export const postVideoInPlaylist = async (playlistId, videoForAdd, authToken) => {
    console.log(playlistId, videoForAdd, authToken, "cccc")
    try {
        const response = await axios.post(`/api/user/playlists/${playlistId}`, {
            video: videoForAdd
        },
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success("Added In Playlist")
            return response.data
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
        throw error
    }
};



export const deletePlaylist = async (playlistId, authToken) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};


export const deleteVideoFromPlaylist = async (playlistId, videoId, authToken) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};

