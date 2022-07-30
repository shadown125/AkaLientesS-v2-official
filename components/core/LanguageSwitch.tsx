import Link from "next/link";
import {useRouter} from "next/router";

const LanguageSwitch = () => {
    const router = useRouter()

    return (
        <ul className="language-switch">
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
