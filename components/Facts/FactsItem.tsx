import {props} from "../../types/FactsTypes";
import {useInView} from "react-intersection-observer";
import Image from "next/image";
import FactsItemKeys from "./FactsItemKeys";

const FactsItem = (props: props) => {
    const { ref, inView } = useInView({
        delay: 500,
        triggerOnce: true
    });

    return (
        <div ref={ref} className={`grid${inView ? ' is-active' : ''}`}>
            <div className="image">
                <Image layout={"fill"} src={props.image} alt={props.headline} />
                <h3 className="headline h3">
                    <span>{ props.headline }</span>
                </h3>
            </div>
            <div className="content">
                <h4 className="headline h4">
                    <span>Fact { props.index + 1 }</span>
                </h4>
                <div className="description">
                    <p>
                        { props.text }
                    </p>
                </div>
            </div>
            <FactsItemKeys keys={props.keys} />
        </div>
    )
}

export default FactsItem
