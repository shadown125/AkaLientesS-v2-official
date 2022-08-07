import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { InitialLoadContext } from "../context/initialLoadContext";
import { useContext } from "react";

const TsParticles = () => {
    const { loadState } = useContext(InitialLoadContext);

    const options = {
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 200,
                    duration: 0.7,
                },
            },
        },
        particles: {
            color: {
                value: ["FF0000DD", "00FFFFDD"],
            },
            links: {
                color: "FF0000DD",
                distance: 40,
                enable: true,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                enable: true,
                speed: 3,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 20,
            },
            opacity: {
                value: {
                    min: 0.1,
                    max: 0.6,
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    return <Particles id="tsparticles" className={`particle${loadState ? " is-active" : ""}`} init={loadFull} options={options} />;
};

export default TsParticles;
