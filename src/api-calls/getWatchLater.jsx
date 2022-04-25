import axios from "axios";

export const getWatchLater = async (authToken) => {
    try {
        const response = await axios.get("/api/user/watchlater", {
            headers: {
                authorization: authToken
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

export const postWatchLaterVideo = async (authToken, watchLatervideo) => {
    try {
        const response = await axios.post("/api/user/watchlater", {
            video: watchLatervideo
        }, {
            headers: {
                authorization: authToken
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
        // window.alert("already exists in watchlist")
        console.log(error);
        throw error
    }
};

export const deleteWatchLaterVideo = async (authToken, watchLatervideoId) => {
    try {
        const response = await axios.delete(`/api/user/watchlater/${watchLatervideoId}`, {
            headers: {
                authorization: authToken
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