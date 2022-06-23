
import { Link } from "react-router-dom"
import "./home.css"
import { useDocumentTitle } from "../../hooks/useDocumentTilte"
import { useEffect } from "react"
export const Home = () => {

    useEffect(() => {
        useDocumentTitle("Home")
    }, [])

    return (
        <div className="home-page-wrapper centre" >
                <p>Welcome to Streaming</p>
                    <Link to= "/videos" className="home-btn">Explore</Link>
        </div>
    )
}

