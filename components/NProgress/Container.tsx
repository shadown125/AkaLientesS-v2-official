import { FC } from "react";

const Container: FC<{
    animationDuration: number;
    isFinished: boolean;
    children: JSX.Element[] | JSX.Element;
}> = ({ animationDuration, children, isFinished }) => {
    return (
        <div
            id="nprogress"
            style={{
                opacity: isFinished ? 0 : 1,
                pointerEvents: "none",
                transition: `opacity ${animationDuration}ms linear`,
            }}
        >
            {children}
        </div>
    );
};

export default Container;
