import {useInView} from "react-intersection-observer";
import ContactForm from "./ContactForm";

const Contact = () => {
    const { ref, inView } = useInView();

    return (
        <section ref={ref} id="contact" className={`contact${ inView ? ' is-active' : ''}`}>
            <div className="wrapper">
                <h2 className="title h2">
                    <span>Contact</span>
                </h2>
                <div className="inner-wrapper">
                    <ContactForm />
                </div>
            </div>
        </section>
    )
}

export default Contact
