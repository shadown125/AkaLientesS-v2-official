import {useInView} from "react-intersection-observer";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {links} from "../../content/NavigationData";
import Image from "next/image";
import {InitialLoadContext} from "../context/initialLoadContext";
import navigationMouseMovement from "../../vanilla-js/NavigationMouseMovement";

const Navigation = () => {
    const {loadState} = useContext(InitialLoadContext)
    const { ref, inView } = useInView({
        delay: 1000,
        triggerOnce: true
    });
    const [windowTop, setWindowTop] = useState<number>(0)
    const [menu, setMenu] = useState<string>('')
    const [delayedActive, setDelayedActive] = useState<boolean>(false)

    const active = () => inView && delayedActive

    const openAndCloseMenu = () => {
        if (!menu) {
            setMenu(' is-active')
            return
        }
        setMenu('')
    }

    useEffect(() => {
        const burgerContainer = document.getElementById('burger-navigation-container') as HTMLElement

        navigationMouseMovement(burgerContainer)

        const animationDelay = 2000

        const delayActiveAnimation = setTimeout(() => {
            if (loadState) {
                setDelayedActive(loadState)
            }
        }, animationDelay)

        const onScroll = () => setWindowTop(window!.top!.scrollY)

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            clearTimeout(delayActiveAnimation)
            window.removeEventListener('scroll', onScroll);
        }
    }, [loadState])

    return (
        <header className="section">
            <div className="wrapper">
                <nav ref={ref} className={`main-navigation${active() ? ' is-active' : ''}${windowTop === 0 && active() ? ' is-loaded' : ''}`}>
                    <Link href="/">
                        <a>
                            <Image layout="fixed" width={80} height={80} src='/brandLogo.png' alt='brand-logo' />
                        </a>
                    </Link>
                    <ul>
                        {links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.route}>
                                    <a>
                                        <span>
                                            <span>{ item.name }</span>
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="#contact">
                        <a className='button'>
                            <span>Contact me</span>
                        </a>
                    </Link>
                </nav>
                <nav className={`section absolute-grid burger-navigation${windowTop !== 0 ? ' is-visible' : ''}${menu}`}>
                    <button className={`menu${menu}`} onClick={openAndCloseMenu}>
                        <span/>
                        <span/>
                        <span/>
                        <span className="name">Menu</span>
                        <svg className={`spinner${menu}`} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                            <circle
                                className="path"
                                fill="none"
                                strokeWidth="4"
                                strokeLinecap="round"
                                cx="33"
                                cy="33"
                                r="31.3"
                            />
                        </svg>
                    </button>
                    <div className={`container${menu}`} id="burger-navigation-container">
                        <div className="content">
                            <ul data-offset="10">
                                {links.map((item, index) => (
                                    <li key={index} onClick={openAndCloseMenu} data-offset={(4 * (index + 1))}>
                                        <Link href={item.route}>
                                            <a>
                                                { item.name }
                                                <span className="layer">
                                                    <span>{ item.name }</span>
                                                </span>
                                                <span className="layer">
                                                    <span>{ item.name }</span>
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                                <li onClick={openAndCloseMenu} data-offset={(links.length * 4) + 4}>
                                    <Link href="#contact">
                                        <a>
                                            CONTACT
                                            <span className="layer">
                                                    <span>CONTACT</span>
                                                </span>
                                            <span className="layer">
                                                    <span>CONTACT</span>
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
    )
}

export default Navigation
