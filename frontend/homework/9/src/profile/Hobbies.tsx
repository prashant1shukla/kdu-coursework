import './Hobbies.css';

interface Hobby {
  id: number;
  hobby: string;
}

interface HobbiesProps {
  hobbies: Hobby[];
}

function Hobbies(props: HobbiesProps) {
  return (
    <div className="hobbies-container">
      <h3 className='head-text'>Hobbies</h3>
      <ul>
        {props.hobbies.map((item) => (
          <li key={item.id} className='list-text'>{item.hobby}</li>
        ))}
      </ul>
    </div>
  );
}

export default Hobbies;
