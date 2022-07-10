import {withNProgress} from "@tanem/react-nprogress";
import {FC} from "react";
import Container from "./Container";
import Bar from "./Bar";

const Progress: FC<{
    animationDuration: number
    isFinished: boolean
    progress: number,
    minimum: number,
    incrementDuration: number
}> = ({ isFinished, progress, animationDuration, minimum, incrementDuration }) => {
    return (
        <div id="progression" className="section progression">
            <div className="percentage">{!isFinished ? (-1 + progress * 100).toFixed(0) : 100}%</div>
            <Container animationDuration={animationDuration} isFinished={isFinished}>
                <Bar animationDuration={animationDuration} progress={progress} />
            </Container>
        </div>
    )
}

export default withNProgress(Progress)
