import { useState } from "react"
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/auth-context";
import { useUserData } from "../../../../context/user-data-context";
import { addNotesInVideo, updateNotesInVideo } from "../../../../services"
import "./note.css"
export const UserInputNotesForm = ({ currentVideoRef, id, editNote, editValue, }) => {
    const { token } = useAuth();
    const { userDataState, userDataDispatch } = useUserData();

    const defaultValue = {
        title: "",
        description: ""
    }

    const [notesInput, setNotesInput] = useState(
        editNote ? { ...editValue } : { ...defaultValue }
    );

    const getTrimInput = (notesData) => {
        if (notesData.title.trim().length > 0 && notesData.description.trim().length > 0) {
            return true
        }
        return false
    }


    const addNoteHandler = (e) => {
        if (token) {
            if (getTrimInput(notesInput))
                addNotesInVideo(
                    {
                        ...notesInput,
                        noteCreatedTime: currentVideoRef.current.getCurrentTime(),
                        id: id,
                    },
                    token,
                    userDataDispatch,
                );
            setNotesInput({ ...defaultValue })

        } else {
            toast.info("Please login to add Note!");
        }
    };

    const updateNoteHandler = () => {
        if (getTrimInput(notesInput)) {
            updateNotesInVideo(
                editValue._id,
                {
                    ...editValue,
                    ...notesInput,
                },
                token,
                userDataDispatch
            );
            editNote(false)
            setNotesInput({ ...defaultValue })
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                editNote ? updateNoteHandler() : addNoteHandler()
            }}
            className="note-form"
        >
            <div>
                <input
                    placeholder="Title"
                    className="w-100 p-1"
                    value={notesInput?.title}
                    onChange={(e) => {
                        setNotesInput((prev) => {
                            return {
                                ...prev,
                                title: e.target.value
                            }
                        })
                    }}
                />
            </div>
            <div>
                <textarea
                    placeholder="Description"
                    className=""
                    value={notesInput?.description}
                    onChange={(e) => {
                        setNotesInput((prev) => {
                            return {
                                ...prev,
                                description: e.target.value
                            }
                        })
                    }}
                />
            </div>
            <div className="flex-between m-1 mt-2">
                <button
                    type="button"
                    className="btn-sm border-squre btn-danger"
                >
                    Discard
                </button>
                <button
                    type="submit"
                    className="btn-sm  border-squre btn-primary"
                >
                    Save
                </button>
            </div>
        </form>
    )
}