import ReactPlayer from 'react-player/youtube'
import { useAuth } from '../../../context/auth-context';
import {addVideoInHistory} from "../../../services"
import { useUserData } from '../../../context/user-data-context';

export const VideoPlayer = ({video}) => {
    const {token}  = useAuth()
    const {userDataDispatch} = useUserData()
    return (
        <>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video._id}`}
                controls
                width="100%"
                height="100%"
                onStart={() => {
                    console.log(video)
                    if (token) addVideoInHistory(video,token, userDataDispatch);
                  }}
            />
        </>
    )
}