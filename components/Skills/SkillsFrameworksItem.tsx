import {frameworks} from "../../content/Skills";
import {CSSProperties} from "react";

const SkillsFrameworksItem = () => {
    const showCardDelay = (delay: number) => {
        return {'--card-delay': delay + 0.6 + 's'} as CSSProperties
    }

    const powerMeterDelay = (delay: number) => {
        return {'--power-meter-delay': delay + 0.5 + 's'} as CSSProperties
    }

    return (
        <>
            {frameworks.map((item, index) => (
                <li key={index}>
                    <div className={`card ${item.name.toLowerCase()}`} style={showCardDelay(index / 2)}>
                        <div className="content">
                            <h3 className="headline h3">
                                <span>{ item.name }</span>
                            </h3>
                            <ul>
                                {[...Array(4)].map((_, index) => (
                                    <li key={index} className={`power-meter${index + 1 <= item.points ? ' is-active' : ''}`} style={powerMeterDelay(index / 6)} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </li>
            ))}
        </>
    )
}

export default SkillsFrameworksItem
