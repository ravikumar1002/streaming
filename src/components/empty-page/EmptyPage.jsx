import { Link } from "react-router-dom"
import  "./empty.css"
export const EmptyPage = ({emptyText, btnText, linkRoute}) => {

    return (
        <div className="centre empty-wrapper">
            <p>{emptyText}</p>
            <Link to={`${linkRoute}`} className ="empty-btn">{btnText}</Link>
        </div>
    )
}