import "./playlist-modal.css";
import { useState, useEffect, useRef } from "react";
import { createNewPlayList, addNewVideoInPlayList } from "../../services";
import { useAuth } from "../../context/auth-context";
import { useUserData } from "../../context/user-data-context";


export const PlaylistModal = ({ showModal, hideModal, newVideo }) => {
    const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);
    const [playlistname, setPlaylistName] = useState({
        title: "",
    });
    const { token } = useAuth();
    const { userDataState, userDataDispatch } = useUserData();

    // const checkAlreadyExitsOrNot = (playlistname, video) => {
    //     const findVideo = userDataState.playlist
    //         .find((playlist) => playlistname._id === playlist._id)
    //         .videos.find((playlistVideo) => playlistVideo._id === video._id);
    //     if (findVideo) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    return (
        <div
            className={`${showModal ? "playlist-modal-wrapper" : "d-none"}`}
            onClick={(e) => {
                e.stopPropagation();
                hideModal(false);
                console.log("c");
            }}
        >
            <div className="playlist-modal">
                <div>
                    <div className="playlist-modal-heading p-1">
                        <span>Save To...</span>
                        <span
                            onClick={() => {
                                hideModal(false);
                            }}
                            className="fa fa-times "
                        ></span>
                    </div>
                </div>
                <ul>
                    {userDataState?.playlist.length > 0 &&
                        userDataState?.playlist.map((list) => {
                            return (
                                <li
                                    className="playlists-in-modal"
                                    key={list._id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addNewVideoInPlayList(list._id, newVideo, token,userDataState, userDataDispatch);
                                        // hideModal(false);
                                    }}
                                >
                                    <label
                                        htmlFor={`playlist-checkbox${list._id}`}
                                        className="d-flex"
                                    >
                                        <input
                                            type="checkbox"
                                            // checked={checkAlreadyExitsOrNot(list, newVideo)}
                                            id={`playlist-checkbox${list._id}`}
                                            // onChange = {() => {
                                            // checkAlreadyExitsOrNot(list, newVideo)
                                            // }}
                                        />
                                        <span>{list.title}</span>
                                    </label>
                                </li>
                            );
                        })}
                </ul>
                {showNewPlaylistForm ? (
                    <div
                        className="new-playlist-create flex-col p-1"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <h4 className="py-1">Name</h4>
                        <input
                            type="text"
                            placeholder="Enter Playlist Name"
                            onChange={(e) => {
                                setPlaylistName((prev) => {
                                    return {
                                        ...prev,
                                        title: e.target.value,
                                    };
                                });
                            }}
                            className=""
                        />
                        <button
                            onClick={() => {
                                setShowNewPlaylistForm(false);
                                createNewPlayList(playlistname, token, userDataDispatch);
                            }}
                            className="btn btn-x-sm btn-primary border-squre mt-1 fs-sm"
                        >
                            Create
                        </button>
                    </div>
                ) : (
                    <div className="new-playlist  p-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowNewPlaylistForm(true);
                            }}
                        >
                            <i className="fa fa-plus"></i> <span>Create New Playlist</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
