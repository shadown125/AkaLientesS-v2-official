import SocialLinks from "../../elements/SocialLinks";
import {useInView} from "react-intersection-observer";

const Footer = () => {
    const { ref, inView } = useInView();

    return (
        <footer ref={ref} className={`section footer${inView ? ' is-active' : ''}`}>
            <div className="wrapper">
                <div className="container">
                    <p className="credits">
                        &copy; { new Date().getFullYear() } All rights reserved by Dawid Oleksiuk
                    </p>
                    <SocialLinks />
                </div>
            </div>
        </footer>
    )
}

export default Footer
