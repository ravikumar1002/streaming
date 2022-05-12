import {postWatchLaterVideo, deleteWatchLaterVideo, postLiked, deleteLiked, postVideoInPlaylist, postPlaylist, deleteVideoFromPlaylist} from "./api-calls"
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

const createNewPlayList = async (nameOfPlaylist, authToken, userDataDispatch) => {
  const getNewPlaylist = await postPlaylist(nameOfPlaylist, authToken);
  userDataDispatch({
      type: "USER_ALL_PLAYLIST",
      payload: {
          playlistVideoData: getNewPlaylist.playlists,
      },
  });
};

const addNewVideoInPlayList = async (playlistId, videoForAdd, authToken,userDataState, userDataDispatch ) => {
  const getNewVideoInPlaylist = await postVideoInPlaylist(
      playlistId,
      videoForAdd,
      authToken
  );
  const updatedValue = userDataState.playlist.map((playlistVideo) =>
      playlistVideo.title === getNewVideoInPlaylist.title
          ? getNewVideoInPlaylist
          : playlistVideo
  );
  userDataDispatch({
      type: "USER_ALL_PLAYLIST",
      payload: {
          playlistVideoData: updatedValue,
      },
  });
};

const deleteVideoInPLaylist = async (playlistId, videoId, authToken, userDataState, userDataDispatch) => {
  const deletedVideoPlaylist = await deleteVideoFromPlaylist(playlistId, videoId, authToken)
  const playlistDataAfterDeleted = userDataState.playlist.reduce((prev, curr) =>
      curr._id === deletedVideoPlaylist.playlist._id
          ? [...prev, deletedVideoPlaylist.playlist]
          : [...prev, curr], [])
  userDataDispatch({
      type: "USER_ALL_PLAYLIST",
      payload: {
          playlistVideoData: playlistDataAfterDeleted
      }
  })
}


export {addVideoInWatchLater, deleteVideoFromWatchLater, addVideoInLiked, deleteVideoFromLiked, createNewPlayList, addNewVideoInPlayList, deleteVideoInPLaylist}