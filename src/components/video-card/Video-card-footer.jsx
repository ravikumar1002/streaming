
export const VideoCardFooter = ({ date, creator }) => {

  return (
    <div className="flex-space-between" style={{paddingTop:"0"}} >
      <small><b>{creator}</b></small>
      <small>{date}</small>
    </div>
  )
}