import { Form, Formik } from "formik";
import axios from "axios";
import NameField from "../../elements/inputFields/NameField";
import EmailField from "../../elements/inputFields/EmailField";
import SubjectField from "../../elements/inputFields/SubjectField";
import MessageAreaField from "../../elements/inputFields/MessageAreaField";
import { ContactDataInterface } from "../../interfaces/ContactDataInterface";
import { useInView } from "react-intersection-observer";
import { contact } from "../../schemas/validation/contact";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const ContactForm = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInView();
    const [notification, setNotification] = useState<string>("");

    const submitHandler = (data: ContactDataInterface, { setSubmitting, resetForm }: { setSubmitting: Function; resetForm: Function }) => {
        axios({
            method: "POST",
            url: process.env.NEXT_PUBLIC_CONTACT_URL,
            data: data,
        })
            .then((_) => {
                setNotification("successfully");

                setTimeout(() => {
                    setNotification("");
                }, 5000);

                setSubmitting(false);
                resetForm(true);
            })
            .catch((_) => {
                setNotification("failed");

                setTimeout(() => {
                    setNotification("");
                }, 5000);

                setSubmitting(false);
            });
    };

    return (
        <>
            <div className={`notification notification--${notification}${notification && " is-active"}`}>
                {notification === "successfully" ? t("home:sections.contact.success-message") : t("home:sections.contact.failed-message")}
            </div>
            <Formik initialValues={{ name: "", email: "", subject: "", message: "" }} onSubmit={submitHandler} validationSchema={contact}>
                {({ isSubmitting }) => (
                    <Form ref={ref} className={`${inView && "is-active"}`}>
                        <div className="row row--double">
                            <div>
                                <NameField name="name" />
                            </div>
                            <div>
                                <EmailField name="email" />
                            </div>
                        </div>
                        <div className="row row--full">
                            <SubjectField name="subject" />
                        </div>
                        <div className="row row--full">
                            <MessageAreaField name="message" />
                        </div>
                        <button className="button" disabled={isSubmitting} type="submit">
                            <span>{t("common:submit")}</span>
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ContactForm;
