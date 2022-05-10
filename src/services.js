import {postWatchLaterVideo, deleteWatchLaterVideo, postLiked, deleteLiked} from "./api-calls"
import { useUserData } from "./context/user-data-context";


const addVideoInWatchLater = async (authToken, watchLatervideo, userDataDispatch) => {
  const saveWatchLaterVideoInServer = await postWatchLaterVideo(
    authToken,
    watchLatervideo
  );
  userDataDispatch({
    type: "WATCH_LATER_VIDEOS",
    payload: {
      watchLaterVideos: saveWatchLaterVideoInServer.watchlater,
    },
  });
};

const deleteVideoFromWatchLater = async (authToken, watchLatervideoId, userDataDispatch) => {
    const deleteWatchLaterVideoInServer = await deleteWatchLaterVideo(
        authToken,
        watchLatervideoId
    );
    userDataDispatch({
        type: "WATCH_LATER_VIDEOS",
        payload: {
            watchLaterVideos: deleteWatchLaterVideoInServer.watchlater
        }
    })
};

const addVideoInLiked = async (authToken, likedVideos, userDataDispatch) => {
  const saveLikedVideoInServer = await postLiked(
    likedVideos,
    authToken
  );
  userDataDispatch({
    type: "LIKED_VIDEOS",
    payload: {
      likedVideos: saveLikedVideoInServer.likes,
    },
  });
};

const deleteVideoFromLiked = async (authToken, likedVideosId, userDataDispatch) => {
  const deleteLikedVideoInServer = await deleteLiked(
      likedVideosId,
      authToken
  );
  userDataDispatch({
    type: "LIKED_VIDEOS",
    payload: {
      likedVideos: deleteLikedVideoInServer.likes,
    },
  });
};


export {addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked}