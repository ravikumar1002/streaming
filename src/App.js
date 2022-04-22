import { useContext } from "react";
import "./App.css";
import "./css/utility.css";
import {
  Home,
  VideosListing,
  Login,
  SignUp,
  PlayList,
  SinglePlaylistPage,
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
        <div className="header-wrapper">
          <Header />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <AsideBar />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<VideosListing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
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
                path="/playlist/:playlistid"
                element={
                  <RequiresAuth>
                    <SinglePlaylistPage />
                  </RequiresAuth>
                }
              />
              <Route path="*" />
            </Routes>
          </div>
        </div>
      </DataLayer>
    </div>
  );
}

export default App;
