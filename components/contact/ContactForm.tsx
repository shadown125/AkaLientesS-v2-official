import {Form, Formik} from "formik";
import axios from "axios";
import NameField from "../../elements/inputFields/NameField";
import EmailField from "../../elements/inputFields/EmailField";
import SubjectField from "../../elements/inputFields/SubjectField";
import MessageAreaField from "../../elements/inputFields/MessageAreaField";
import {ContactDataInterface} from "../../interfaces/ContactDataInterface";
import {useInView} from "react-intersection-observer";
import {contact} from "../../schemas/validation/contact";

const ContactForm = () => {
    const { ref, inView } = useInView();

    const submitHandler = (data: ContactDataInterface, {setSubmitting, resetForm}: {setSubmitting: Function, resetForm: Function}) => {
        axios({
            method: "POST",
            url: process.env.NEXT_PUBLIC_CONTACT_URL,
            data: data
        }).then(_ => {
            setSubmitting(false)
            resetForm(true)
        }).catch(_ => {
            setSubmitting(false)
        })
    }

    return (
        <Formik initialValues={{name: '', email: '', subject: '', message: ''}} onSubmit={submitHandler} validationSchema={contact} >
            {({ isSubmitting }) => (
                <Form ref={ref} className={`${inView && 'is-active'}`}>
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
                        <span>Submit</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default ContactForm
