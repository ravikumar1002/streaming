import axios from "axios";
import { toast } from "react-toastify";

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
            toast.success("Added in Watchlater")
            return response.data
        }
    } catch (error) {
        toast.error("Something went wrong")
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
            toast.success("Deleted From Watchlater")
            return response.data
        }
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error);
        throw error
    }
};