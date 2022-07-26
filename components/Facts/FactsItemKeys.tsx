import {useInView} from "react-intersection-observer";
import {keysProps} from "../../types/FactsTypes";
import {useTranslation} from "next-i18next";

const FactsItemKeys = (props: keysProps) => {
    const { t } = useTranslation('home')
    const { ref, inView } = useInView({
        delay: 300,
        triggerOnce: true
    });


    return (
        <div ref={ref} className={`keys${inView ? ' is-active' : ''}`}>
            {props.keys.map((item, index) => (
                <div key={index}>
                    <span>{ item.head }</span>
                    <span>{ t(`sections.facts.${item.name}`) }</span>
                </div>
            ))}
        </div>
    )
}

export default FactsItemKeys
