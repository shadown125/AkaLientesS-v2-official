import {useInView} from "react-intersection-observer";
import SocialLinks from "../../elements/SocialLinks";
import Typewriter from "../helpers/Typewriter";
import baffle from '../Baffle/baffle'
import {useEffect} from "react";

const Staging = () => {
    const { ref, inView } = useInView({
        delay: 2000,
        triggerOnce: true,
    });

    useEffect(() => {
        baffle('.author').set({
            characters: '░░▓ ▒▒/▒░ ░██░▒ █░> ██░▓░ █░░▒ ▓>/ ██▓▓ ▓>░/',
            speed: 50
        }).start().reveal(3000)
    })

    return (
        <section ref={ref} className={`staging${inView ? ' is-active' : ''}`}>
            <div className="wrapper">
                <div className="grid">
                    <SocialLinks active={inView ? ' is-active' : ''} />
                    <div className="content">
                        <h1 className="headline h1">
                            <Typewriter word='Aka' isVisible={inView} />
                            <Typewriter word='LientesS' isVisible={inView} />
                        </h1>
                        <p className="author">
                            Created and Designed by Dawid Oleksiuk
                        </p>
                    </div>
                    <div className={`letters${inView ? ' is-active' : ''}`}>
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
