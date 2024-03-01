import '../styling/Cost.scss';

export function Cost() {
  return (
    <div className="cost">
        <div className="price">
            <p className='text-cost'>Cost + 18% GST = </p>
        </div>
        <div className="options">
            <button className="button-cost">Submit</button>
        </div>
    </div>
  )
}
