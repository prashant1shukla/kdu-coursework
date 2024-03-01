import '../styling/RoomType.scss';
export function RoomType() {
  return (
    <div className="room-type">
        <div className="title">
            <p className='text'>Select Room Type</p>
        </div>
        <div className="options">
            <button className="button">Single Room</button>
            <button className="button">Twin Room</button>
            <button className="button">Deluxe</button>
            <button className="button">Presidential Suite</button>
        </div>
    </div>
  )
}
