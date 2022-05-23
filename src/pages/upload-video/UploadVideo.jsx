import { useState } from "react"
import { useVideoDataFromServer } from "../../context/video-context"
import { useUserData } from "../../context/user-data-context"
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
        <div>
            video url
            <form action="" onSubmit={(e) => {
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
                <input type="text" placeholder="url" onChange={(e) => inputValue("url", e.target.value)} />
                <input type="text" placeholder="title" onChange={(e) => inputValue("title", e.target.value)} />
                <input type="text" placeholder="category" onChange={(e) => inputValue("category", e.target.value)} />
                <input type="text" placeholder="description" onChange={(e) => inputValue("description", e.target.value)} />
                <input type="text" placeholder="creator" onChange={(e) => inputValue("creator", e.target.value)} />
                <button type="submit" onClick={() => {
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