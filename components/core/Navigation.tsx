import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import Link from "next/link";
import {links} from "../../content/NavigationData";
import Image from "next/image";

const Navigation = () => {
    const { ref, inView } = useInView({
        delay: 1000,
        triggerOnce: true
    });
    const [windowTop, setWindowTop] = useState<number>(0)
    const [menu, setMenu] = useState<string>('')

    const openAndCloseMenu = () => {
        if (!menu) {
            setMenu(' is-active')
            return
        }
        setMenu('')
    }

    useEffect(() => {
        const onScroll = () => setWindowTop(window!.top!.scrollY)

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    })

    return (
        <header className="section">
            <div className="wrapper">
                <nav ref={ref} className={`main-navigation${inView ? ' is-active' : ''}${windowTop ? '' : ' is-loaded'}`}>
                    <Link href="/">
                        <a>
                            <Image width={80} height={80} src='/brandLogo.png' alt='brand-logo' />
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
                    <a href="mailto:dawidoleksiuk7@gmail.com" className='button'>
                        <span>Contact me</span>
                    </a>
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
                    <div className={`container${menu}`}>
                        <div className="content">
                            <ul>
                                {links.map((item, index) => (
                                    <li key={index} onClick={openAndCloseMenu}>
                                        <Link href={item.route}>
                                            <a>
                                                <span data-text={item.name}>{ item.name }</span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navigation
