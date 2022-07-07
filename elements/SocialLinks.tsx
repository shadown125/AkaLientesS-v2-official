import {socialList} from '../content/SocialLinksData'
import {useInView} from "react-intersection-observer";

const SocialLinks = () => {
    const { ref, inView } = useInView();

    return (
        <ul ref={ref} className={`social-links${inView ? ' is-active' : ''}`}>
            {socialList.map((link, index) => (
                <li key={index}>
                    <a href={link.link} rel="external noopener noreferrer" target="_blank" className={`icon ${link.name}`}>
                        <span>{ link.name }</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default SocialLinks
