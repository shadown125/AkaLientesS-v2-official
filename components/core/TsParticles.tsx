import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const TsParticles = () => {
    const options = {
        interactivity: {
            events: {
                onHover: {
                    mode: 'repulse',
                        enable: true
                }
            }
        },
        modes: {
            push: {
                quantity: 15
            },
            repulse: {
                distance: 30
            }
        },
        particles: {
            color: {
                value: ['FF0000DD', '00FFFFDD']
            },
            links: {
                color: 'FF0000DD',
                    distance: 40,
                    enable: true
            },
            move: {
                enable: true
            },
            opacity: {
                value: {
                    min: 0.1,
                        max: 0.4
                }
            },
            size: {
                value: {
                    min: 1,
                        max: 3
                }
            }
        }
    }

    return (
        <Particles id="tsparticles" init={loadFull} options={options} />
    )
}

export default TsParticles
