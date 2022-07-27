import SocialLinks from "../../elements/SocialLinks";
import {useInView} from "react-intersection-observer";
import {useContext} from "react";
import {InitialLoadContext} from '../context/initialLoadContext'
import {useTranslation} from "next-i18next";

const Footer = () => {
    const { t } = useTranslation('common')
    const { ref, inView } = useInView();
    const {loadState} = useContext(InitialLoadContext);

    return (
        <footer ref={ref} className={`section footer${inView && loadState ? ' is-active' : ''}`}>
            <div className="wrapper">
                <div className="container">
                    <p className="credits">
                        &copy; { new Date().getFullYear() } {t('credits')}
                    </p>
                    <SocialLinks active={inView ? ' is-active' : ''} />
                </div>
            </div>
        </footer>
    )
}

export default Footer
