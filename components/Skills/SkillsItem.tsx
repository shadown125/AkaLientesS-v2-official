import { useInView } from "react-intersection-observer";
import { skillsItemProps } from "../../types/SkillsTypes";
import { CSSProperties } from "react";
import { useTranslation } from "next-i18next";

const SkillsItem = (props: skillsItemProps) => {
    const { t } = useTranslation("home");
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    const setAnimationTime = (time: number) => {
        return { "--power-meter-delay": time + 2 + "s" } as CSSProperties;
    };

    return (
        <div ref={ref} className={`content${inView ? " is-active" : ""}`}>
            <div className="head">
                <div className={`name icon icon--${props.name}`} />
                <div className="keys">
                    {props.keys.map((item, index) => (
                        <div key={index}>
                            <span>{item.head}</span>
                            <span>{t(`sections.skills.${item.name}`)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ul>
                {[...Array(12)].map((_, index) => (
                    <li key={index} className={`power-meter${index + 1 <= props.points ? " is-active" : ""}`} style={setAnimationTime(index / 6)}></li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsItem;
