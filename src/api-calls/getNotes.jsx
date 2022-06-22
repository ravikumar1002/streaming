import axios from "axios";
// import { toast } from "react-toastify";

export const getNotes = async (authToken) => {
    try {
        const response = await axios.get(`/api/user/notes`, {
            headers: { authorization: authToken },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (e) {
        console.log(error);
        // toast.error("Something went wrong")
        throw error
    }
};

export const addNewNote = async (note, authToken) => {
    try {
        const response = await axios.post(
            "/api/user/notes",
            { note },
            {
                headers: { authorization: authToken },
            }
        );
        if (response.status === 200 || response.status === 201) {
            // toast.success("Note added!")
            return response.data
        }
    } catch (e) {
        console.log(error);
        // toast.error("Something went wrong")
        throw error
    }
};

export const deleteNote = async (noteId, authToken) => {
    try {
        const response = await axios.delete(`/api/user/notes/${noteId}`, {
            headers: { authorization: authToken },
        });
        if (response.status === 200 || response.status === 201) {
            // toast.success("Note deleted")
            return response.data
        }
    } catch (e) {
        console.log(error);
        // toast.error("Something went wrong")
        throw error
    }
};

export const updateNote = async (noteId,note, authToken) => {
    try {
        const response = await axios.post(`/api/user/notes/${noteId}`,
            { note },
            {
                headers: { authorization: authToken },
            }
        );
        if (response.status === 200 || response.status === 201) {
            // toast.success("Note Updated")
            return response.data
        }
    } catch (e) {
        console.log(error);
        // toast.error("Something went wrong")
        throw error
    }
};
