import './Profile.css';
import Skills from './Skills';
import Hobbies from './Hobbies';
import data from '../data.json';

interface Person {
  name: string;
  fullName: string;
  qualification: string;
}

const Profile = () => {
  const { name, fullName, qualification }: Person = data;

  return (
    <div className="profile-container">
      <div className="header">
        <h1>{name}</h1>
        <h4>{fullName}</h4>
        <h2><strong>{qualification}</strong></h2>
      </div>
      <div className='about'>
      <Skills skills={data.skills} />
      <Hobbies hobbies={data.hobbies} />
      </div>
    </div>
  );
}

export default Profile;
