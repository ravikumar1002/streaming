import ReactPlayer from 'react-player/youtube'

export const VideoPlayer = ({videoId}) => {
    return (
        <>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                onStart={() => {

                }}
            />
        </>
    )
}