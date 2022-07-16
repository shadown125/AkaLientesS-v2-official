import {useEffect, useRef, useState} from "react";
// @ts-ignore
import { Plane, useCurtains } from "react-curtains";
// @ts-ignore
import { Vec2 } from "curtainsjs/src";
import {vs, fs } from "../../shaders/ShadersData";
import {useMediaQuery} from "react-responsive";
import Image from "next/image";

const FactsImagePlane = (props: {children: JSX.Element[] | JSX.Element, image: string, headline: string}) => {
    const [plane, setPlane] = useState(null);

    const isTabletOrMobile = useMediaQuery({query: '(max-width: 50em)'})

    const mousePosition = useRef(new Vec2());
    const mouseLastPosition = useRef(new Vec2());

    const deltas = useRef({
        max: 0,
        applied: 0
    });

    const uniforms: any = {
        resolution: {
            name: "uResolution",
            type: "2f",
            value: [0, 0]
        },
        time: {
            name: "uTime",
            type: "1f",
            value: 0
        },
        mousePosition: {
            name: "uMousePosition",
            type: "2f",
            value: mousePosition.current
        },
        mouseMoveStrength: {
            name: "uMouseMoveStrength",
            type: "1f",
            value: 0
        }
    };

    useCurtains(
        (curtains: any) => {
            const onMove = (e: any) => {
                mouseLastPosition.current.copy(mousePosition.current);

                const mouse = new Vec2();

                if (e.targetTouches) {
                    mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
                } else {
                    mouse.set(e.clientX, e.clientY);
                }

                mousePosition.current.set(
                    curtains.lerp(mousePosition.current.x, mouse.x, 0.3),
                    curtains.lerp(mousePosition.current.y, mouse.y, 0.3)
                );
                if (mouseLastPosition.current.x && mouseLastPosition.current.y) {
                    let delta =
                        Math.sqrt(
                            Math.pow(
                                mousePosition.current.x - mouseLastPosition.current.x,
                                8
                            ) +
                            Math.pow(
                                mousePosition.current.y - mouseLastPosition.current.y,
                                8
                            )
                        ) / 50;
                    delta = Math.min(4, delta);
                    if (delta >= deltas.current.max) {
                        deltas.current.max = delta;
                    }
                }

                if (plane) {
                    // @ts-ignore
                    plane.uniforms.mousePosition.value = plane.mouseToPlaneCoords(
                        mousePosition.current
                    );
                }
            };

            window.addEventListener("mousemove", onMove);
            window.addEventListener("touchmove", onMove, { passive: true });

            return () => {
                window.removeEventListener("mousemove", onMove);
                // @ts-ignore
                window.removeEventListener("touchmove", onMove, { passive: true });
            };
        },
        [plane]
    );

    const setResolution = (plane: any) => {
        const planeBBox = plane.getBoundingRect();
        plane.uniforms.resolution.value = [planeBBox.width, planeBBox.height];
    };

    const onReady = (plane: any) => {
        plane.setPerspective(135);

        deltas.current.max = 6;

        setResolution(plane);

        setPlane(plane);
    };

    const onRender = (plane: any) => {
        plane.uniforms.time.value++;

        deltas.current.applied +=
            (deltas.current.max - deltas.current.applied) * 0.02;
        deltas.current.max += (0 - deltas.current.max) * 0.02;

        plane.uniforms.mouseMoveStrength.value = deltas.current.applied;
    };

    const onAfterResize = (plane: any) => {
        setResolution(plane);
    };

    return (
        <>
            {!isTabletOrMobile ? (
                <Plane
                    className="image-plane"
                    vertexShader={vs}
                    fragmentShader={fs}
                    widthSegments={20}
                    heightSegments={20}
                    uniforms={uniforms}
                    onReady={onReady}
                    onRender={onRender}
                    onAfterResize={onAfterResize}
                    watchScroll={false}
                >
                    {props.children}
                </Plane>
            ) : (
                <Image layout={"fill"} src={props.image} alt={props.headline} data-sampler="imagePlaneTexture" />
            )}
        </>
    );
}

export default FactsImagePlane;
