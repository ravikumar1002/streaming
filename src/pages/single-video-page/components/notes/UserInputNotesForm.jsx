import { useState } from "react"
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/auth-context";
import { useUserData } from "../../../../context/user-data-context";
import { addNotesInVideo, updateNotesInVideo } from "../../../../services"

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

    console.log(id)


    const addNoteHandler = (e) => {
        e.preventDefault();
        console.log(currentVideoRef.current.getCurrentTime())
        console.log(editNote)
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
        } else toast.info("Please login to add Note!");
    };

    const updateNoteHandler = (e) => {
        e.preventDefault();
        console.log(editNote)
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
        }
    };

    console.log(notesInput)
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                editNote ? updateNoteHandler(e) : addNoteHandler(e)
                setNotesInput({...defaultValue})
            }}
        >
            <div>
                <input
                    placeholder="Title"
                    className=""
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
            <div className="">
                <button
                    type="submit"
                    className=""
                >
                    Save
                </button>
                <button
                    type="button"
                    className=""
                >
                    Discard
                </button>
            </div>
        </form>
    )
}