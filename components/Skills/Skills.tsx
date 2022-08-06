import {useInView} from "react-intersection-observer";
import SkillsItem from "./SkillsItem";
import {skills} from "../../content/Skills";
import SkillsFrameworks from "./SkillsFrameworks";
import {useTranslation} from "next-i18next";

const Skills = () => {
    const { t } = useTranslation('home')
    const { ref, inView } = useInView({
        triggerOnce: true
    });

    return (
        <section ref={ref} id="skills" className={`skills${inView ? ' is-active' : ''}`}>
            <div className="wrapper">
                <h2 className="title title--skills h2">
                    <span>
                        <span>{ t('navigation.skills') }</span>
                        { t('navigation.skills') }
                        <span>{ t('navigation.skills') }</span>
                    </span>
                </h2>
                <ul className="skills-list">
                    {skills.map((item, index) => (
                        <li key={index} className={`skill${inView ? ' is-active' : ''}`}>
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
