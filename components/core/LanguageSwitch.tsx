import Link from "next/link";
import {router} from "next/client";

const LanguageSwitch = () => {
    return (
        <ul className="languages-switch">
            <li>
                <Link href="/" locale={'en'} >
                    <a className={router.locale === 'en' ? 'is-active' : ''}>
                        <span>EN</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/" locale={'pl'} >
                    <a className={router.locale === 'pl' ? 'is-active' : ''}>
                        <span>PL</span>
                    </a>
                </Link>
            </li>
        </ul>
    )
}

export default LanguageSwitch
