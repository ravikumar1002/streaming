
import axios from "axios";

export const getAllVideos = async () => {
    try {
        const response = await axios.get(`/api/videos`);
        if (response.status === 200 || response.status === 201) {
            return response.data.videos;
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};
