import '../styling/AddOns.scss'
export function AddOns() {
  return (
    <div className="add-ons">
        <div className="title">
            <p className='text'>Select additional add ons /preferences</p>
        </div>
        <div className="options">
            <button className="button">Breakfast</button>
            <button className="button">Balcony Unit</button>
            <button className="button">Sea Facing</button>
        </div>
    </div>
  )
}
