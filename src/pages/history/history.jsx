import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { getAllVideoHistory , deleteAllHistoryFromServer} from "../../services"
import { VideoCard } from "../../components"

export const History = () => {
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()

    useEffect(() => {
        getAllVideoHistory(token, userDataDispatch)
    }, [])

    return (
        <div className="m-2 p-1">
            <div className="flex-space-between ">
                <div>
                    <h2>All History</h2>
                </div>
                <div>
                    <button onClick={() => {
                        deleteAllHistoryFromServer(token, userDataDispatch)
                    }} className= "btn btn-primary btn-sm border-squre">Clear History</button>
                </div>
            </div>
            <div className="p-2 d-flex gap-2" >
                {userDataState.history.length > 0 ? userDataState.history.map((history) => {
                    return (
                        <div key={history._id}>
                        <VideoCard video={history} history = {true} />
                        </div>
                    )
                }) : <div>no item</div>}
            </div>
        </div>
    )
}