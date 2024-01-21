import { props } from "../../types/FactsTypes";
import { useInView } from "react-intersection-observer";
import FactsItemKeys from "./FactsItemKeys";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { MutableRefObject, useRef } from "react";

const FactsItem = (props: props) => {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        delay: 500,
        triggerOnce: true,
    });

    const image = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

    return (
        <div ref={ref} className={`grid${inView ? " is-active" : ""}`}>
            <div ref={image} className="image">
                <Image priority={true} layout={"fill"} src={props.image} alt={props.headline} />
                <h3 className="headline h3">
                    <span>{t(`home:sections.facts.${props.headline}`)}</span>
                </h3>
            </div>
            <div className="content">
                <h4 className="headline h4">
                    <span>
                        <span>{`${t("common:fact")} ${props.index + 1}`}</span>
                        {`${t("common:fact")} ${props.index + 1}`}
                        <span>{`${t("common:fact")} ${props.index + 1}`}</span>
                    </span>
                </h4>
                <div className="description">
                    <p>{t(`home:sections.facts.${props.text}`, { joinArrays: "" })}</p>
                </div>
            </div>
            <FactsItemKeys keys={props.keys} />
        </div>
    );
};

export default FactsItem;
