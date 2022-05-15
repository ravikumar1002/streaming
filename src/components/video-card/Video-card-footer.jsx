
export const VideoCardFooter = ({ date, creator }) => {

  return (
    <div className="flex-space-between">
      <small><b>{creator}</b></small>
      <span>{date}</span>
    </div>
  )
}