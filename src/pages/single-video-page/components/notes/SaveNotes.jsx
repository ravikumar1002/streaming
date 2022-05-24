import { UserInputNotesForm } from "./UserInputNotesForm";
import { useState } from "react";
import { deleteNotesInVideo } from "../../../../services";
import { useAuth } from "../../../../context/auth-context";
import { useUserData } from "../../../../context/user-data-context";
export const SaveNotes = ({ note }) => {
    const [editNote, setEditNote] = useState(false);
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()


    return (
        <>
            {!editNote && (
                <div>
                    <p >{note.title}</p>
                    <p >{note.description}</p>
                    <p>
                        {note.noteCreatedTime}
                    </p>
                    <div>
                        <button
                            onClick={() => setEditNote(true)}
                            className="btn-no-decoration text-white"
                        >
                            edit
                        </button>
                        <button
                            onClick={() => deleteNotesInVideo(note._id, token, userDataDispatch)}
                        >
                            delete
                        </button>
                    </div>
                </div>
            )}
            {editNote && (
                <UserInputNotesForm editNote={setEditNote} editValue={note} />
            )}
        </>
    )
}


