
export const VideoCardFooter = ({ date, creator }) => {

  return (
    <div className="flex-space-between">
      <small><b>{creator}</b></small>
      <small>{date}</small>
    </div>
  )
}