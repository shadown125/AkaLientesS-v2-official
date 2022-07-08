import {useInView} from "react-intersection-observer";
import {textLeft, textRight} from "../../content/SidebarLettersData";
import {useEffect, useState} from "react";

const SidebarLetters = () => {
    const { ref, inView } = useInView({
        triggerOnce: true
    });
    const [windowTop, setWindowTop] = useState<number>(0)
    const transformOffset = 125

    useEffect(() => {
        const onScroll = () => setWindowTop(window!.top!.scrollY * 0.7)

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    })

    return (
        <div ref={ref} className={`section absolute-grid sidebar${inView ? ' is-active' : ''}`}>
            <div className="japanese-text japanese-text--left">
                {textLeft.map((item, index) => (
                    <span key={index} style={{ transform: `translateY(${windowTop * -1 - transformOffset}px)` }}>{ item.name }</span>
                ))}
            </div>
            <div className="japanese-text japanese-text--right">
                {textRight.map((item, index) => (
                    <span key={index} style={{ transform: `translateY(${windowTop * -1 + transformOffset + 500}px)` }}>{ item.name }</span>
                ))}
            </div>
        </div>
    )
}

export default SidebarLetters
