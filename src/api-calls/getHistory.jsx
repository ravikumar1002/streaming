import axios from "axios";
import { toast } from "react-toastify";


export const getHistory = async (token) => {
    try {
        const response = await axios.get("/api/user/history", {
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


export const postHistory = async (historyVideo, authToken) => {
    try {
        const response = await axios.post(`/api/user/history`, {
            video: historyVideo
        },
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


export const deleteHistory = async (deleteVideoId, authToken) => {
    try {
        const response = await axios.delete(`/api/user/history/${deleteVideoId}`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`History Deleted successful`);
            return response.data
        }
    } catch (error) {
        toast.error(error?.response?.data?.errors)
        console.log(error);
        throw error
    }
};

export const deleteAllHistory = async (authToken) => {
    try {
        const response = await axios.delete(`/api/user/history/all`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`All History Deleted`);
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};