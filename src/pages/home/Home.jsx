import { useAuth } from "../../context/auth-context"

export const Home = () => {
 const {user} =  useAuth()
    return (
        <div>
            <p>{user?.encodedToken}</p>
            <h2> Welcome to the Streaming</h2>
        </div>
    )
}

