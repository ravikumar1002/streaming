import {
  postWatchLaterVideo,
  deleteWatchLaterVideo,
  postLiked,
  deleteLiked,
  postVideoInPlaylist,
  postPlaylist,
  deleteVideoFromPlaylist,
  getPlaylist,
  deletePlaylist,
  getHistory,
  postHistory,
  deleteHistory,
  deleteAllHistory,
  addNewNote,
  getNotes,
  deleteNote,
  updateNote,
} from "./api-calls";
import { useUserData } from "./context/user-data-context";

const addVideoInWatchLater = async (
  authToken,
  watchLatervideo,
  userDataDispatch
) => {
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

const deleteVideoFromWatchLater = async (
  authToken,
  watchLatervideoId,
  userDataDispatch
) => {
  const deleteWatchLaterVideoInServer = await deleteWatchLaterVideo(
    authToken,
    watchLatervideoId
  );
  userDataDispatch({
    type: "WATCH_LATER_VIDEOS",
    payload: {
      watchLaterVideos: deleteWatchLaterVideoInServer.watchlater,
    },
  });
};

const addVideoInLiked = async (authToken, likedVideos, userDataDispatch) => {
  const saveLikedVideoInServer = await postLiked(likedVideos, authToken);
  userDataDispatch({
    type: "LIKED_VIDEOS",
    payload: {
      likedVideos: saveLikedVideoInServer.likes,
    },
  });
};

const deleteVideoFromLiked = async (
  authToken,
  likedVideosId,
  userDataDispatch
) => {
  const deleteLikedVideoInServer = await deleteLiked(likedVideosId, authToken);
  userDataDispatch({
    type: "LIKED_VIDEOS",
    payload: {
      likedVideos: deleteLikedVideoInServer.likes,
    },
  });
};

const createNewPlayList = async (
  nameOfPlaylist,
  authToken,
  userDataDispatch
) => {
  const getNewPlaylist = await postPlaylist(nameOfPlaylist, authToken);
  userDataDispatch({
    type: "USER_ALL_PLAYLIST",
    payload: {
      playlistVideoData: getNewPlaylist.playlists,
    },
  });
};

const addNewVideoInPlayList = async (
  playlistId,
  videoForAdd,
  authToken,
  userDataState,
  userDataDispatch
) => {
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

const deleteVideoInPLaylist = async (
  playlistId,
  videoId,
  authToken,
  userDataState,
  userDataDispatch
) => {
  const deletedVideoPlaylist = await deleteVideoFromPlaylist(
    playlistId,
    videoId,
    authToken
  );
  const playlistDataAfterDeleted = userDataState.playlist.reduce(
    (prev, curr) =>
      curr._id === deletedVideoPlaylist.playlist._id
        ? [...prev, deletedVideoPlaylist.playlist]
        : [...prev, curr],
    []
  );
  userDataDispatch({
    type: "USER_ALL_PLAYLIST",
    payload: {
      playlistVideoData: playlistDataAfterDeleted,
    },
  });
};

const getAllPlaylistFromServer = async (token, userDataDispatch) => {
  const playlistData = await getPlaylist(token);
  userDataDispatch({
    type: "USER_ALL_PLAYLIST",
    payload: {
      playlistVideoData: playlistData.playlists,
    },
  });
};

const deletePlaylistFromServer = async (
  playlistId,
  authToken,
  userDataDispatch
) => {
  const getdeletedPlaylist = await deletePlaylist(playlistId, authToken);
  userDataDispatch({
    type: "USER_ALL_PLAYLIST",
    payload: {
      playlistVideoData: getdeletedPlaylist.playlists,
    },
  });
};

const getAllVideoHistory = async (authToken, userDataDispatch) => {
  const saveHistoryVideoInServer = await getHistory(authToken);
  userDataDispatch({
    type: "HISTORY_VIDEOS",
    payload: {
      historyVideoData: saveHistoryVideoInServer.history,
    },
  });
};

const addVideoInHistory = async (historyVideo, authToken, userDataDispatch) => {
  const saveHistoryVideoInServer = await postHistory(historyVideo, authToken);
  userDataDispatch({
    type: "HISTORY_VIDEOS",
    payload: {
      historyVideoData: saveHistoryVideoInServer.history,
    },
  });
};

const deleteHistoryFromServer = async (
  historyId,
  authToken,
  userDataDispatch
) => {
  const getdeletedHistory = await deleteHistory(historyId, authToken);
  userDataDispatch({
    type: "HISTORY_VIDEOS",
    payload: {
      historyVideoData: getdeletedHistory.history,
    },
  });
};

const deleteAllHistoryFromServer = async (authToken, userDataDispatch) => {
  const getdeletedAllHistory = await deleteAllHistory(authToken);
  userDataDispatch({
    type: "HISTORY_VIDEOS",
    payload: {
      historyVideoData: getdeletedAllHistory.history,
    },
  });
};

const getALlNotes = async (authToken) => {
  const getNoteVideoInServer = await getNotes(authToken);
  userDataDispatch({
    type: "NOTES",
    payload: {
      notes: getNoteVideoInServer.notes,
    },
  });
};

const addNotesInVideo = async (note, authToken, userDataDispatch) => {
  const saveNoteVideoInServer = await addNewNote(note, authToken);
  userDataDispatch({
    type: "NOTES",
    payload: {
      notes: saveNoteVideoInServer.notes,
    },
  });
};

const deleteNotesInVideo = async (noteId, authToken, userDataDispatch) => {
  const getdeletedNotes = await deleteNote(noteId, authToken);
  userDataDispatch({
    type: "NOTES",
    payload: {
      notes: getdeletedNotes.notes,
    },
  });
};

const updateNotesInVideo = async (
  noteId,
  note,
  authToken,
  userDataDispatch
) => {
  const UpdateNoteVideoInServer = await updateNote(noteId, note, authToken);
  userDataDispatch({
    type: "NOTES",
    payload: {
      notes: UpdateNoteVideoInServer.notes,
    },
  });
};

export {
  addVideoInWatchLater,
  deleteVideoFromWatchLater,
  addVideoInLiked,
  deleteVideoFromLiked,
  createNewPlayList,
  addNewVideoInPlayList,
  deleteVideoInPLaylist,
  getAllPlaylistFromServer,
  deletePlaylistFromServer,
  getAllVideoHistory,
  addVideoInHistory,
  deleteHistoryFromServer,
  deleteAllHistoryFromServer,
  getALlNotes,
  addNotesInVideo,
  deleteNotesInVideo,
  updateNotesInVideo,
};
