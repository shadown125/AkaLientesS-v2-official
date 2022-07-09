import {socialList} from '../content/SocialLinksData'

const SocialLinks = (props: {active: string}) => {

    return (
        <ul className={`social-links${props.active}`}>
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
