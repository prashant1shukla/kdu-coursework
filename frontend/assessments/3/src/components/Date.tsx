import '../styling/Date.scss'
export function Date() {
  return (
    <div className="date">
        <div className="title">
            <p className='text'>Select Room Type</p>
        </div>
        <div className="options">
            <button className="button">Start Date</button>
            <button className="button">End Date</button>
        </div>
    </div>
  )
}
