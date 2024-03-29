import { useInView } from "react-intersection-observer";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { links } from "../../content/NavigationData";
import { InitialLoadContext } from "../context/initialLoadContext";
import navigationMouseMovement from "../../vanilla-js/NavigationMouseMovement";
import { useTranslation } from "next-i18next";
import LanguageSwitch from "./LanguageSwitch";
import { useMediaQuery } from "react-responsive";
import Logo from "../../elements/Logo";

const Navigation = () => {
    const { t } = useTranslation();
    const { loadState } = useContext(InitialLoadContext);
    const isTablet = useMediaQuery({ query: "(max-width: 50em)" });
    const { ref, inView } = useInView({
        delay: 1000,
        triggerOnce: true,
    });
    const [windowTop, setWindowTop] = useState<number>(0);
    const [menu, setMenu] = useState<string>("");
    const [delayedActive, setDelayedActive] = useState<boolean>(false);
    const burgerContainer = useRef<HTMLDivElement>(null);

    const active = () => inView && delayedActive;

    const openAndCloseMenu = () => {
        if (!menu) {
            setMenu(" is-active");
            return;
        }
        setMenu("");
    };

    useEffect(() => {
        !isTablet && navigationMouseMovement(burgerContainer.current!);

        const animationDelay = 2000;

        const delayActiveAnimation = setTimeout(() => {
            if (loadState) {
                setDelayedActive(loadState);
            }
        }, animationDelay);

        const onScroll = () => setWindowTop(window!.top!.scrollY);

        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(delayActiveAnimation);
            window.removeEventListener("scroll", onScroll);
        };
    }, [isTablet, loadState]);

    return (
        <header className="section">
            <div className="wrapper">
                <nav ref={ref} className={`main-navigation${active() ? " is-active" : ""}${windowTop === 0 && active() ? " is-loaded" : ""}`}>
                    <Link href="/">
                        <a className="logo">
                            <span>Logo</span>
                            <Logo />
                        </a>
                    </Link>
                    <ul className="nav-links">
                        {links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.route}>
                                    <a>
                                        <span>
                                            <span>{t(`home:navigation.${item.name}`).toLocaleUpperCase()}</span>
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="right-row">
                        <LanguageSwitch />
                        <Link href="#contact">
                            <a className="button">
                                <span>{t("common:contact-me")}</span>
                            </a>
                        </Link>
                    </div>
                </nav>
                <nav className={`section absolute-grid burger-navigation${windowTop !== 0 ? " is-visible" : ""}${menu}`}>
                    <button className={`menu${menu}`} onClick={openAndCloseMenu}>
                        <span />
                        <span />
                        <span />
                        <span className="name">Menu</span>
                        <svg className={`spinner${menu}`} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                            <circle className="path" fill="none" strokeWidth="4" strokeLinecap="round" cx="33" cy="33" r="31.3" />
                        </svg>
                    </button>
                    <div ref={burgerContainer} className={`container${menu}`}>
                        <div className="content">
                            <ul data-offset="10">
                                {links.map((item, index) => (
                                    <li key={index} onClick={openAndCloseMenu} data-offset={4 * (index + 1)}>
                                        <Link href={item.route}>
                                            <a>
                                                {t(`home:navigation.${item.name}`).toLocaleUpperCase()}
                                                <span className="layer">
                                                    <span>{t(`home:navigation.${item.name}`).toLocaleUpperCase()}</span>
                                                </span>
                                                <span className="layer">
                                                    <span>{t(`home:navigation.${item.name}`).toLocaleUpperCase()}</span>
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                                <li onClick={openAndCloseMenu} data-offset={links.length * 4 + 4}>
                                    <Link href="#contact">
                                        <a>
                                            {t("common:contact").toLocaleUpperCase()}
                                            <span className="layer">
                                                <span>{t("common:contact").toLocaleUpperCase()}</span>
                                            </span>
                                            <span className="layer">
                                                <span>{t("common:contact").toLocaleUpperCase()}</span>
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
