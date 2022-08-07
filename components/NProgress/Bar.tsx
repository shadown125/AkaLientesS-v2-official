import { FC } from "react";

const Bar: FC<{ animationDuration: number; progress: number }> = ({ animationDuration, progress }) => {
    return (
        <div
            className="bar"
            style={{
                left: 0,
                marginLeft: `${(-1 + progress) * 100}%`,
                position: "absolute",
                top: 0,
                transition: `margin-left ${animationDuration}ms linear`,
                width: "100%",
                zIndex: 1031,
            }}
        >
            <div
                className="peg"
                style={{
                    boxShadow: "0 0 10px #29d, 0 0 5px #29d",
                    display: "block",
                    height: "100%",
                    opacity: 1,
                    position: "absolute",
                    right: 0,
                    transform: "rotate(3deg) translate(0px, -4px)",
                }}
            />
        </div>
    );
};

export default Bar;
