import { Link, NavLink } from "react-router-dom";
import "./aside-bar.css";

export const AsideBar = () => {
    const getActiveStyle = ({ isActive }) => ({
        color: isActive ? "black" : ""
    });
    return (
        <div className="aside-bar-wrapper">
            <nav className="aside-bar">
                <NavLink style={getActiveStyle} to="videos">
                    <span>
                        <i className="fa-solid fa-house"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="videos">
                    <span>
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="liked">
                    <span>
                        <i className="fa-solid fa-heart"></i>
                    </span>
                </NavLink >

                <NavLink style={getActiveStyle} to="/watchlater">
                    <span>
                        <i className="fa-solid fa-clock"></i>
                    </span>
                </NavLink>

                <NavLink style={getActiveStyle} to="PlayList">
                    <span>
                        <i className="fa-solid fa-list-ul"></i>
                    </span>
                </NavLink>
            </nav>
        </div>
    );
};
