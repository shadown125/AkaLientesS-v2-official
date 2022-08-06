import {useInView} from "react-intersection-observer";
import SkillsFrameworksItem from "./SkillsFrameworksItem";
import {useTranslation} from "next-i18next";

const SkillsFrameworks = () => {
    const { t } = useTranslation('home')
    const { ref, inView } = useInView({
        triggerOnce: true
    });

    return (
        <div ref={ref} className={`frameworks${ inView ? ' is-active' : ''}`}>
            <h3 className="title title--frameworks h2">
                <span>
                    <span>{ t('sections.frameworks-and-libraries') }</span>
                    { t('sections.frameworks-and-libraries') }
                    <span>{ t('sections.frameworks-and-libraries') }</span>
                </span>
            </h3>
            <ul>
                <SkillsFrameworksItem />
            </ul>
        </div>
    )
}

export default SkillsFrameworks
