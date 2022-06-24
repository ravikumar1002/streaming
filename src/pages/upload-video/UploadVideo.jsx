import { useEffect, useState } from "react"
import { useVideoDataFromServer } from "../../context/video-context"
import { useUserData } from "../../context/user-data-context"
import "./upload.css"
import { useDocumentTitle } from "../../hooks/useDocumentTilte"
export const UploadVideo = () => {

    const { userDataState, userDataDispatch } = useUserData()
    const { videoDispatch } = useVideoDataFromServer();


    const [video, setVideo] = useState({
        _id: "",
        title: "",
        category: "",
        description: "",
        creator: "",
        uploadDate: "",
        url: "",
        notes:[],
    })
    
    const initalvalue = {
        _id: "",
        title: "",
        category: "",
        description: "",
        creator: "",
        uploadDate: "",
        url: "",
        notes:[],
    }

    const inputValue = (key, value) => {
        setVideo((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }
    const getDate = () => new Date().toLocaleDateString("en-IN").split("/").join("-")
    const getId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    }

    useEffect(() => {
        useDocumentTitle("Upload")
    }, [])


    return (
        <div className="upload-form-wrapper ">
            <form action="" className="upload-form" onSubmit={(e) => {
                e.preventDefault()
                userDataDispatch({
                    type: "UPLOADED_VIDEO",
                    payload: {
                        uploadVideo: { ...video, viewCount: 0 },
                    }
                })
                videoDispatch({
                    type: "UPLOAD_VIDEO",
                    payload: {
                        video: { ...video, viewCount: 0 },
                    }
                })
                setVideo(initalvalue)
            }}>
                <div>
                    <label htmlFor="url">Enter Video Url</label>
                    <input required type="text" placeholder="https://youtu.be/ video link" value={video.url} id="url" onChange={(e) => inputValue("url", e.target.value)} />
                </div>
                <div>
                    <label htmlFor="title">Enter Video Title</label>
                    <input required type="text" id="Title" placeholder="title" value={video.title} onChange={(e) => inputValue("title", e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">Enter Video Category</label>
                    <input required type="text" id="category" placeholder="Category" value={video.category} onChange={(e) => inputValue("category", e.target.value)} />
                </div>
                <div>
                    <label htmlFor="creator">Enter Video Creator</label>
                    <input required type="text" id="creator" placeholder="Creator" value={video.creator} onChange={(e) => inputValue("creator", e.target.value)} />
                </div>
                <div className="textarea-box">
                    <label htmlFor="description">Enter Video Description</label>
                    <textarea required name="description" id="description" placeholder="Description" value={video.description} onChange={(e) => inputValue("description", e.target.value)} cols="10" rows="2"></textarea>
                </div>
                <button type="submit" className="w-100 btn-block btn-primary border-squre btn-sm" onClick={() => {
                    setVideo((prev) => {
                        return {
                            ...prev,
                            _id: getId(video.url),
                            uploadDate: getDate(),
                        }
                    })
                }}>Submit</button>
            </form>
        </div>
    )
}