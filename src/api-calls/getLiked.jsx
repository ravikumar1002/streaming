import axios from "axios";

export const getLiked = async (token) => {
    try {
        const response = await axios.get("/api/user/likes", {
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


export const postLiked = async (likedVideo, authToken) => {
    try {
        const response = await axios.post(`/api/user/likes`, {
            video: likedVideo
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


export const deleteLiked = async (deleteVideoId, authToken) => {
    try {
        const response = await axios.delete(`/api/user/likes/${deleteVideoId}`,
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