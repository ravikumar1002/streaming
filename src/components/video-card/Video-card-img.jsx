
export const VideoCardImg = ({ id, title }) => {
    return (
        <div>
            <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt={title} />
        </div>
    )
}