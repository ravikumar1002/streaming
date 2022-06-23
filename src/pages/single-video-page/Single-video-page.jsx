import { useParams } from "react-router-dom";
import "./single-video-page.css"
import { useVideoDataFromServer } from "../../context/video-context"
import { VideoPlayer, VideoPlayerCentre, SignglePlayerFooter } from './components/video-player';
import { VideoCard } from "../../components";
import { UserInputNotesForm } from "./components/notes/UserInputNotesForm";
import { useEffect, useRef } from "react";
import { SaveNotes } from "./components/notes/SaveNotes";
import { useUserData } from "../../context/user-data-context";
import { useDocumentTitle } from "../../hooks/useDocumentTilte";

export const SingleVideoPage = () => {

    const { singlevideoid } = useParams()
    const currentVideoRef = useRef()
    const { videoState } = useVideoDataFromServer()
    const { userDataState, userDataDispatch } = useUserData()

    const currentVideo = videoState.allVideos.find(videos => videos._id === singlevideoid)
    const categoryVideo = videoState.allVideos.filter(category => currentVideo.category === category.category && currentVideo._id !== category._id)
    const notes = userDataState?.notes.filter((note) => note.id === singlevideoid).sort((a, b) => b.noteCreatedTime - a.noteCreatedTime);

    useEffect(() => {
        useDocumentTitle(currentVideo.title)
    },[])

    return (
        <div className="single-video-wrapper">
            {
                videoState.allVideos.length > 0 ? <div>
                    <div className='single-video-player'>
                        <VideoPlayer video={currentVideo} currentVideoRef={currentVideoRef} />
                        <VideoPlayerCentre currentVideo={currentVideo} />
                        <SignglePlayerFooter totalViews={currentVideo.viewCount} description={currentVideo.description} />
                    </div>
                </div>
                    :
                    <div>
                        "loading"
                    </div>
            }
            <div>
                <div>
                    <div className="note-input-wrapper">
                        <UserInputNotesForm currentVideoRef={currentVideoRef} id={currentVideo?._id} editMode={false} />
                    </div>
                    <div className="mt-1 m-1 flex-col gap-1">
                        {notes.length > 0 ? notes.map((note) => {
                            return (
                                <SaveNotes key={note._id} note={note} />
                            )
                        }) : <h3 className="m-1 note-input-wrapper text-center">No notes added yet</h3>}
                    </div>
                </div>
                {categoryVideo.length > 0 && <div className="py-1">
                    <h2> More {currentVideo.category}</h2>
                    {categoryVideo.map(video => {
                        return (
                            <div className="mt-1" key={video._id}>
                                <VideoCard video={video} key={video._id} />
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        </div>
    )
}