import { useState } from "react"
import { useVideoDataFromServer } from "../../context/video-context"
import { useUserData } from "../../context/user-data-context"
import "./upload.css"
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
        url: ""
    })
    const initalvalue = {
        _id: "",
        title: "",
        category: "",
        description: "",
        creator: "",
        uploadDate: "",
        url: ""
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


    return (
        <div className="upload-form-wrapper ">
            <form action="" className="upload-form" onSubmit={(e) => {
                e.preventDefault()
                userDataDispatch({
                    type: "UPLOADED_VIDEO",
                    payload: {
                        uploadVideo: video
                    }
                })
                videoDispatch({
                    type: "UPLOAD_VIDEO",
                    payload: {
                        video: video
                    }
                })
            }}>
                <div>
                    <label htmlFor="url">Enter Video Url</label>
                    <input type="text" placeholder="https://youtu.be/ video link" id = "url" onChange={(e) => inputValue("url", e.target.value)} />
                </div>
                <div>
                    <label htmlFor="title">Enter Video Title</label>
                    <input type="text" id="Title" placeholder="title" onChange={(e) => inputValue("title", e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">Enter Video Category</label>
                    <input type="text" id="category" placeholder="Category" onChange={(e) => inputValue("category", e.target.value)} />
                </div>
                <div>
                    <label htmlFor="creator">Enter Video Creator</label>
                    <input type="text" id="creator" placeholder="Creator" onChange={(e) => inputValue("creator", e.target.value)} />
                </div>
                <div className="textarea-box">
                    <label htmlFor="description">Enter Video Description</label>
                    <textarea name="description" id="description" placeholder="Description" cols="10" rows="2"></textarea>
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