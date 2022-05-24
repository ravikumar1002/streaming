export const SignglePlayerFooter = ({ totalViews, description }) => {
    return (
        <div className="px-2">
            <div >
                <div className="mb-1 fw-500">Total View: <span>{totalViews}</span> </div>
                <p>{description}</p>

            </div>
        </div>

    )
}