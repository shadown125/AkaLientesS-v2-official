import {useInView} from "react-intersection-observer";
import {CSSProperties, useContext} from "react";
import {InitialLoadContext} from "../components/context/initialLoadContext";

const FloatingLines = () => {
    const {loadState} = useContext(InitialLoadContext)
    const { ref, inView, entry } = useInView();
    const time = entry ? entry?.boundingClientRect.height / 1000 : null;

    const active = () => inView && loadState

    const setAnimationTime = () => {
        return {'--floating-lines-animation-time': time + 's'} as CSSProperties
    }

    return (
        <div ref={ref} className={`section absolute-grid floating-lines ${active() ? ' is-active' : ''}`} style={setAnimationTime()}>
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}

export default FloatingLines
