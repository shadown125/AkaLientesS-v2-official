import {useInView} from "react-intersection-observer";
import {facts} from "../../content/FactsData";
import FactsItem from './FactsItem';
import {useTranslation} from "next-i18next";

const Facts = () => {
    const { t } = useTranslation('home')
    const { ref, inView } = useInView({
        triggerOnce: true
    });

    return (
         <section ref={ref} id="facts" className={`facts${inView ? ' loaded is-active' : ''}`}>
             <div className="wrapper">
                 <h2 className="h2 headline title">
                     <span>{t('navigation.facts')}</span>
                 </h2>
                 <ul className="facts-list">
                     {facts.map((item, index) => (
                         <li key={index}>
                             <FactsItem index={index} headline={item.headline} text={item.text} image={item.image} keys={item.keys} />
                         </li>
                     ))}
                 </ul>
             </div>
         </section>
    )
}

export default Facts
