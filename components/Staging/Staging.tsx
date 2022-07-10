import {useInView} from "react-intersection-observer";
import SocialLinks from "../../elements/SocialLinks";
import Typewriter from "../helpers/Typewriter";
import baffle from '../Baffle/baffle'
import {useContext, useEffect, useState} from "react";
import {InitialLoadContext} from "../context/initialLoadContext";

const Staging = () => {
    const {loadState} = useContext(InitialLoadContext)
    const { ref, inView } = useInView({
        triggerOnce: true,
    });
    const [delayedActive, setDelayedActive] = useState<boolean>(false)

    const active = () => inView && delayedActive

    useEffect(() => {
        const animationDelay = 2000

        const delayActiveAnimation = setTimeout(() => {
            setDelayedActive(loadState)
        }, animationDelay)

        const baffleTimeout = setTimeout(() => {
            if (delayedActive) {
                baffle('.author').set({
                    characters: '░░▓ ▒▒/▒░ ░██░▒ █░> ██░▓░ █░░▒ ▓>/ ██▓▓ ▓>░/',
                    speed: 50
                }).start().reveal(3000)
            }
        }, animationDelay / 2)

        return () => {
            clearTimeout(delayActiveAnimation)
            clearTimeout(baffleTimeout)
        }
    })

    return (
        <section ref={ref} className={`staging${active() ? ' is-active' : ''}`}>
            <div className="wrapper">
                <div className="grid">
                    <SocialLinks active={active() ? ' is-active' : ''} />
                    <div className="content">
                        <h1 className="headline h1">
                            <Typewriter word='Aka' isVisible={active()} />
                            <Typewriter word='LientesS' isVisible={active()} />
                        </h1>
                        <p className="author">
                            Created and Designed by Dawid Oleksiuk
                        </p>
                    </div>
                    <div className={`letters${active() ? ' is-active' : ''}`}>
                        <span>Y</span>
                        <span>O</span>
                        <span>L</span>
                        <span>O</span>
                        <span>N</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Staging
