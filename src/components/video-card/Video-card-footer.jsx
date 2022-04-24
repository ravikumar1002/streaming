
export const VideoCardFooter = ({ date, creator }) => {

  return (
    <div className="flex-space-between">
      <b>{creator}</b>
      <span>{date}</span>
    </div>
  )
}