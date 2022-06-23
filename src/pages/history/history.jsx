import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { useUserData } from "../../context/user-data-context"
import { getAllVideoHistory, deleteAllHistoryFromServer } from "../../services"
import { VideoCard } from "../../components"
import { EmptyPage } from "../../components/empty-page/EmptyPage"
import { useDocumentTitle } from "../../hooks/useDocumentTilte"

export const History = () => {
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()

    useEffect(() => {
        getAllVideoHistory(token, userDataDispatch)
        useDocumentTitle("History")
    }, [])


    return (
        <div className={`${userDataState.history.length === 0 ? "m-2 p-1" : "m-2 p-1"}`}>
            <div className="flex-space-between ">
                <div>
                    <h2>All History</h2>
                </div>
                {userDataState.history.length > 0 &&
                    <div>
                        <button onClick={() => {
                            deleteAllHistoryFromServer(token, userDataDispatch)
                        }} className="btn btn-danger btn-sm border-squre">Clear History</button>
                    </div>}
            </div>
            <div className={`p-2 d-flex gap-2 ${userDataState.history.length > 0 ? "grid-layout" : ""}`}>
                {userDataState.history.length > 0 ? userDataState.history.map((history) => {
                    return (
                        <div key={history._id} className="w-100">
                            <VideoCard video={history} history={true} />
                        </div>
                    )
                }) : <EmptyPage emptyText={"Your history is empty"} btnText={"Start Explore"} linkRoute={"/videos"} />}
            </div>
        </div>
    )
}