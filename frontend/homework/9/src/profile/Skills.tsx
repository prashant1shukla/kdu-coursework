import './Skills.css';

interface Skill {
  id: number;
  skill: string;
}

interface SkillsProps {
  skills: Skill[];
}

function Skills(props: SkillsProps) {
  return (
    <div className="skills-container">
      <h3 className='head-text'>Skills</h3>
      <ul>
        {props.skills.map((item) => (
          <li key={item.id} className='list-text'>{item.skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
