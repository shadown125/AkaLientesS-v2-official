import {useInView} from "react-intersection-observer";
import SkillsItem from "./SkillsItem";
import {skills} from "../../content/Skills";
import SkillsFrameworks from "./SkillsFrameworks";

const Skills = () => {
    const { ref, inView } = useInView({
        triggerOnce: true
    });

    return (
        <section  id="skills" className={`skills${inView ? ' is-active' : ''}`}>
            <div className="wrapper">
                <h2 className="title title--skills h2">
                    <span>Skills</span>
                </h2>
                <ul className="skills-list">
                    {skills.map((item, index) => (
                        <li ref={ref} key={index} className={`skill${inView ? ' is-active' : ''}`}>
                            <SkillsItem name={item.name} points={item.points} keys={item.keys} />
                        </li>
                    ))}
                </ul>
                <SkillsFrameworks />
            </div>
        </section>
    )
}

export default Skills
