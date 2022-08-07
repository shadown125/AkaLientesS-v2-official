import { useInView } from "react-intersection-observer";
import MyWorkItem from "./MyWorkItem";
import { projects } from "../../content/MyWorkData";
import { useTranslation } from "next-i18next";

const MyWork = () => {
    const { t } = useTranslation("home");
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    return (
        <section ref={ref} id="my-work" className={`my-work${inView ? " is-active" : ""}`}>
            <div className="wrapper">
                <h2 className="title h2">
                    <span>
                        <span>{t("navigation.my-work")}</span>
                        {t("navigation.my-work")}
                        <span>{t("navigation.my-work")}</span>
                    </span>
                </h2>
                <ul>
                    {projects.map((item, index) => (
                        <li key={index}>
                            <MyWorkItem name={item.name} content={item.content} description={item.description} index={index} image={item.image} link={item.link} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default MyWork;
