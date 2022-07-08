import {useInView} from "react-intersection-observer";
import {keysProps} from "../../types/FactsTypes";

const FactsItemKeys = (props: keysProps) => {
    const { ref, inView } = useInView({
        delay: 300,
        triggerOnce: true
    });


    return (
        <div ref={ref} className={`keys${inView ? ' is-active' : ''}`}>
            {props.keys.map((item, index) => (
                <div key={index}>
                    <span>{ item.head }</span>
                    <span>{ item.name }</span>
                </div>
            ))}
        </div>
    )
}

export default FactsItemKeys
