import "./App.css";
import "./css/utility.css";
import { Home, VideosListing } from "./pages/index";
import { Routes, Route, Link } from "react-router-dom";
import DataLayer from "./Data-layer";
import { AsideBar, Header } from "./components/index";

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
            </Routes>
          </div>
        </div>
      </DataLayer>
    </div>
  );
}

export default App;
