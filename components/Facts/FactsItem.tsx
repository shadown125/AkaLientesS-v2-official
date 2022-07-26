import {props} from "../../types/FactsTypes";
import {useInView} from "react-intersection-observer";
import FactsItemKeys from "./FactsItemKeys";
import FactsCurtain from "./FactsCurtain";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";

const FactsItem = (props: props) => {
    const { t } = useTranslation()
    const { ref, inView } = useInView({
        delay: 500,
        triggerOnce: true
    });
    const [clientSideShow, setClientSideShow] = useState<boolean>(false)

    useEffect(() => {
        setClientSideShow(true)
    }, [])

    return (
        <div ref={ref} className={`grid${inView ? ' is-active' : ''}`}>
            <div className="image">
                {clientSideShow && <FactsCurtain image={props.image} headline={props.headline} />}
                <h3 className="headline h3">
                    <span>{ t(`home:sections.facts.${props.headline}`) }</span>
                </h3>
            </div>
            <div className="content">
                <h4 className="headline h4">
                    <span>{ `${t('common:fact')} ${props.index + 1}` }</span>
                </h4>
                <div className="description">
                    <p>
                        { t(`home:sections.facts.${props.text}`, {joinArrays: ''})}
                    </p>
                </div>
            </div>
            <FactsItemKeys keys={props.keys} />
        </div>
    )
}

export default FactsItem
