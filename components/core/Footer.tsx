import SocialLinks from "../../elements/SocialLinks";
import {useInView} from "react-intersection-observer";
import {useContext} from "react";
import {InitialLoadContext} from '../context/initialLoadContext'
import {useTranslation} from "next-i18next";
import LanguageSwitch from "./LanguageSwitch";
import {useMediaQuery} from "react-responsive";

const Footer = () => {
    const { t } = useTranslation('common')
    const { ref, inView } = useInView();
    const {loadState} = useContext(InitialLoadContext);
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 50em)'})

    return (
        <footer ref={ref} className={`section footer${inView && loadState ? ' is-active' : ''}`}>
            <div className="wrapper">
                <div className="container">
                    <p className="credits">
                        &copy; { new Date().getFullYear() } {t('credits')}
                    </p>
                    <div className="additional">
                        <SocialLinks active={inView ? ' is-active' : ''} />
                        {isTabletOrMobile && <LanguageSwitch />}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
