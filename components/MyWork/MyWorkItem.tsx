import {useInView} from "react-intersection-observer";
import Image from "next/image";
import {props} from "../../types/MyWorkData";
import {useTranslation} from "next-i18next";

const MyWorkItem = (props: props) => {
    const { t } = useTranslation('home')
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    const getCurrentCounter = (index: number) => {
        return index < 10 ? '0' + (index + 1) : index + 1
    }

    return (
        <div ref={ref} className={`container${ inView ? ' is-active' : ''}`}>
            <a href={props.link} target='_blank' rel="external noopener noreferrer">
                <span className="counter" data-text={getCurrentCounter(props.index)}>{ getCurrentCounter(props.index) }</span>
                <Image priority={true} layout="fill" src={props.image} alt={props.name} />
                <div className="key-headline">
                    <h3 className="headline h3">{ props.name }</h3>
                    <span>{ t(`sections.my-work.${props.description}`) }</span>
                </div>
            </a>
            <div className="content">
                <p>{ t(`sections.my-work.${props.content}`) }</p>
            </div>
        </div>
    )
}

export default MyWorkItem
