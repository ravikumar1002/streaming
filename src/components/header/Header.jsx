import "./header.css"
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth-context";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
    const location = useLocation()
    const { token , logout} = useAuth()
    const [open, setOpen] = useState(false);
    const container = useRef();
    const navigate = useNavigate()
    const handleButtonClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (container?.current && !container?.current?.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex-space-around p-2 nav-bg-primary">
            <div className="inline-centre">
                <button className="open-menu">
                    <i className="fa fa-bars"></i>
                </button>
                <h2>
                    <Link to="/videos" className="nav-text-primary text-decoration-none">
                        <i>Streaming</i>
                    </Link>
                </h2>
            </div>
            <div className="search-input-wrapper search-bar ">
                <span className="input-search nav-input-width">
                    <span className="fas fa-search input-search-icon"></span>
                    <input
                        type="search"
                        className="input-search-input"
                        placeholder="Search"
                    />
                </span>

            </div>
            <nav  className="container" ref={container}>
                <ul className="horizontal-align-centre nav-text-primary">
                    <li className="list-style-none">
                        {token ?
                            // <button>
                                <button
                                    className="inline-centre nav-text-primary btn-icon-text-left btn-sm nav-btn-primary"
                                    onClick={() => {
                                        // setShowProfileState(!showProfileState)
                                        handleButtonClick()
                                    }}
                                >
                                    <span className="badge-container">
                                        <i className="fas fa-user fs-md"></i>
                                    </span>
                                </button>
                            // </button>
                            :
                            <button>
                                <Link
                                    to="/login"
                                    state={location?.pathname}
                                    className="nav-btn-primary nav-text-primary "
                                >
                                    <span className="btn btn-secondary btn-sm border-squre">
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
                             <button className="btn btn-sm btn-block" onClick={() => {
                                 logout()
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

