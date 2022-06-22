import "./header.css"
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth-context";
import { useState, useEffect, useRef } from "react";
import { useUserData } from "../../context/user-data-context";

export const Header = () => {
    const location = useLocation()
    const { token , logout} = useAuth()
    const [open, setOpen] = useState(false);
    const container = useRef();
    const navigate = useNavigate()
    const {userDataState, userDataDispatch}  = useUserData()
    const handleButtonClick = () => {
        setOpen((prev) => !prev);
    };
    const userIntialData = {
        playlist: [],
        history: [],
        watchLater: [],
        liked: [],
    }
    const handleClickOutside = (e) => {
        if (container?.current && !container?.current?.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex-between p-2 header">
            <div className="inline-centre">
                <h2>
                    <Link to="/videos" className="nav-text-primary text-decoration-none">
                        <i>Streaming</i>
                    </Link>
                </h2>
            </div>
            <nav  className="container" ref={container}>
                <ul className="horizontal-align-centre nav-text-primary">
                    <li className="list-style-none">
                        {token ?
                                <button
                                    className="inline-centre nav-text-primary btn-icon-text-left btn-sm nav-btn-primary"
                                    onClick={() => {
                                        handleButtonClick()
                                    }}
                                >
                                    <span >
                                        <i className="fas fa-user fs-md"></i>
                                    </span>
                                </button>
                            :
                            <button>
                                <Link
                                    to="/login"
                                    state={location?.pathname}
                                    className="nav-btn-primary nav-text-primary "
                                >
                                    <span className="btn btn-secondary btn-sm border-squre" style={{display: "inline-block", }}>
                                        Login
                                    </span>
                                </Link>
                            </button>
                        }
                    </li>
                </ul>
                {open && <div className="user-profile-buttons">
                     <ul>
                         <li className="list-style-none">
                             <button className="btn btn-sm btn-block" onClick={async () => {
                                 await logout()
                                 userDataDispatch({
                                     type: "LOGOUT"
                                 })
                                 handleButtonClick()
                                 navigate("/videos")
                             }}>Logout</button>
                         </li>
                     </ul>
                    </div>}
            </nav>
        </header>
    );
};

