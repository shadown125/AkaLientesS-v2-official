import {useInView} from "react-intersection-observer";
import SkillsFrameworksItem from "./SkillsFrameworksItem";

const SkillsFrameworks = () => {
    const { ref, inView } = useInView();

    return (
        <div ref={ref} className={`frameworks${ inView ? ' is-active' : ''}`}>
            <h3 className="title title--frameworks h2">
                <span>Frameworks and Libraries</span>
            </h3>
            <ul>
                <SkillsFrameworksItem />
            </ul>
        </div>
    )
}

export default SkillsFrameworks
