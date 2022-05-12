import { useEffect } from "react";
import { getAllVideos } from "./api-calls/index";
import { useVideoDataFromServer } from "./context/video-context";

const DataLayer = ({ children }) => {
  const { videoDispatch } = useVideoDataFromServer();

  const getVideosFromServer = async () => {
    const serverVideos = await getAllVideos();
    videoDispatch({
      type: "GET_ALL_VIDEOS_FROM_SERVER",
      payload: {
        videos: serverVideos,
      },
    });
  };

  

  useEffect(() => {
    getVideosFromServer();
  }, []);

  return <div>{children}</div>;
};

export default DataLayer;
