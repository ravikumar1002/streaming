import { useContext } from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import "./App.css";
import "./css/utility.css";
import {
  Home,
  VideosListing,
  Login,
  SignUp,
  PlayList,
  SinglePlaylistPage,
  SingleVideoPage,
  WatchLater,
  Liked,
  History,
  ErrorPage,
  UploadVideo,
} from "./pages/index";
import { Routes, Route, Link } from "react-router-dom";
import DataLayer from "./Data-layer";
import { AsideBar, Header } from "./components/index";
import { RequiresAuth } from "./pages/auth/components/RequiresAuth";
import Mockman from "mockman-js";

function App() {
  return (
    <div className="App">
      <DataLayer>
        {/* <ToastContainer position="top-right" autoClose={700} draggable /> */}
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="d-flex">
          <div className="aside-container">
            <AsideBar />
          </div>
          <div className="w-100" style={{ background: "#fefefe" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<VideosListing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/videos/:singlevideoid"
                element={<SingleVideoPage />}
              />
              <Route path="/mockman" element={<Mockman />} />
              <Route
                path="/playlist"
                element={
                  <RequiresAuth>
                    <PlayList />
                  </RequiresAuth>
                }
              />
              <Route
                path="/liked"
                element={
                  <RequiresAuth>
                    <Liked />
                  </RequiresAuth>
                }
              />
              <Route
                path="/playlist/:playlistid"
                element={
                  <RequiresAuth>
                    <SinglePlaylistPage />
                  </RequiresAuth>
                }
              />
              <Route
                path="/watchlater"
                element={
                  <RequiresAuth>
                    <WatchLater />
                  </RequiresAuth>
                }
              />
              <Route
                path="/history"
                element={
                  <RequiresAuth>
                    <History />
                  </RequiresAuth>
                }
              />
              <Route
                path="/uploadvideo"
                element={
                  <RequiresAuth>
                    <UploadVideo />
                  </RequiresAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </DataLayer>
    </div>
  );
}

export default App;
