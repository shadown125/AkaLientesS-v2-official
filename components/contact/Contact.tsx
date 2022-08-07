import { useInView } from "react-intersection-observer";
import ContactForm from "./ContactForm";
import { useTranslation } from "next-i18next";

const Contact = () => {
    const { t } = useTranslation("common");
    const { ref, inView } = useInView();

    return (
        <section ref={ref} id="contact" className={`contact${inView ? " is-active" : ""}`}>
            <div className="wrapper">
                <h2 className="title h2">
                    <span>
                        <span>{t("contact")}</span>
                        {t("contact")}
                        <span>{t("contact")}</span>
                    </span>
                </h2>
                <div className="inner-wrapper">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default Contact;
