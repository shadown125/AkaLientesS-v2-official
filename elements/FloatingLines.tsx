import {useInView} from "react-intersection-observer";
import {CSSProperties} from "react";

const FloatingLines = () => {
    const { ref, inView, entry } = useInView();
    const time = entry ? entry?.boundingClientRect.height / 1000 : null;

    const setAnimationTime = () => {
        return {'--floating-lines-animation-time': time + 's'} as CSSProperties
    }

    return (
        <div ref={ref} className={`section absolute-grid floating-lines ${inView ? ' is-active' : ''}`} style={setAnimationTime()}>
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}

export default FloatingLines
