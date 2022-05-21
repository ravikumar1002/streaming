import { Link, NavLink } from "react-router-dom";
import "./aside-bar.css";

export const AsideBar = () => {
    const activeStyle = {
        color: "white",
        background: "#616161",
        borderRadius: "50 %",
        padding: "0.5rem",
        borderRadius: "5px",
    };

    const deactiveStyle = {
        color: "white",
        padding: "0.5rem",
    };

    const getActiveStyle = ({ isActive }) =>
        isActive ? activeStyle : deactiveStyle;
    return (
        <div className="aside-bar-wrapper">
            <nav className="aside-bar">
                <NavLink style={getActiveStyle} to="videos">
                    <span>
                        <i className="fa-solid fa-house"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="/history">
                    <span>
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="/liked">
                    <span>
                        <i className="fa-solid fa-heart"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="/watchlater">
                    <span>
                        <i className="fa-solid fa-clock"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="/PlayList">
                    <span>
                        <i className="fa-solid fa-list-ul"></i>
                    </span>
                </NavLink>
            </nav>
        </div>
    );
};
