import { UserInputNotesForm } from "./UserInputNotesForm";
import { useState } from "react";
import { deleteNotesInVideo } from "../../../../services";
import { useAuth } from "../../../../context/auth-context";
import { useUserData } from "../../../../context/user-data-context";
import "./note.css"
export const SaveNotes = ({ note }) => {
    const [editNote, setEditNote] = useState(false);
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()


    return (
        <>
            {!editNote && (
                <div className="note-input-wrapper">
                    <h2 >{note.title}</h2>
                    <p >{note.description}</p>
                    <p > <small> <span className="mr-1">Added Time: </span>
                        {note.noteCreatedTime}</small>
                    </p>
                    <div className="flex-between m-1 mt-2">
                        <button
                            onClick={() => deleteNotesInVideo(note._id, token, userDataDispatch)}
                            className = " btn-sm btn-danger border-squre fa fa-trash"
                        >
                        </button>

                        <button
                            onClick={() => setEditNote(true)}
                            className="btn-sm border-squre btn-primary fa fa-pencil"
                        >
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


