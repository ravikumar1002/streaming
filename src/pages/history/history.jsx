import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { getAllVideoHistory , deleteAllHistoryFromServer} from "../../services"
import { VideoCard } from "../../components"
import { EmptyPage } from "../../components/empty-page/EmptyPage"

export const History = () => {
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()

    useEffect(() => {
        getAllVideoHistory(token, userDataDispatch)
    }, [])

    return (
        <div className="m-2 p-1" style={{height: `${userDataState.history.length === 0 ? "97%" : "auto" }`}}>
            <div className="flex-space-between ">
                <div>
                    <h2>All History</h2>
                </div>
                <div>
                    <button onClick={() => {
                        deleteAllHistoryFromServer(token, userDataDispatch)
                    }} className= "btn btn-danger btn-sm border-squre">Clear History</button>
                </div>
            </div>
            <div className="p-2 d-flex gap-2"  style={{height: `${userDataState.history.length === 0 ? "78%" : "auto" }`}}>
                {userDataState.history.length > 0 ? userDataState.history.map((history) => {
                    return (
                        <div key={history._id} className= "w-100">
                        <VideoCard video={history} history = {true} />
                        </div>
                    )
                }) : <EmptyPage emptyText ={"Your History is Empty"} btnText ={"Start Explore"} linkRoute ={"/videos"}/>}
            </div>
        </div>
    )
}