import { useAuth } from "../../context/auth-context"
import { Link } from "react-router-dom"
import "./home.css"
export const Home = () => {
    return (
        <div className="home-page-wrapper centre">
                <p>Welcome to Streaming</p>
                    <Link to= "/videos" className="home-btn">Explore</Link>
        </div>
    )
}

