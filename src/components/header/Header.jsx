import "./header.css"
import { Link } from "react-router-dom"

export const Header = () => {

    return (

        <header className="flex-space-around p-2 nav-bg-primary">
            <div className="inline-centre">
                <button className="open-menu">
                    <i className="fa fa-bars"></i>
                </button>
                <h2>
                    <Link to="/" className="nav-text-primary text-decoration-none">
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
            <nav >
                <ul className="horizontal-align-centre nav-text-primary">
                    <li className="list-style-none">
                        <button>
                            <Link
                                to="/signup"
                                className="nav-btn-primary nav-text-primary "
                            >
                                <span className="btn btn-secondary btn-sm border-squre">
                                    signUp
                                </span>
                            </Link>
                        </button>
                        {/* <button>
                            <Link
                                to="profile"
                                className="inline-centre nav-text-primary btn-icon-text-left btn-sm nav-btn-primary"
                            >
                                <span className="badge-container">
                                    <i className="fas fa-user fs-md"></i>
                                </span>
                            </Link>
                        </button> */}
                    </li>
                    <li className="list-style-none">
                        <button>
                            <i className="fa-solid fa-moon"></i>
                        </button>
                        {/* <button>
                        <i class="fa-solid fa-sun"></i>
                        </button> */}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

