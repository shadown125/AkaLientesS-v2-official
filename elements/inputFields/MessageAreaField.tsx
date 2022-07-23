import { useField } from "formik";

const MessageAreaField = (props: {name: string}) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''

    if (errorText) {
        return (
            <>
                <div className="input is-invalid">
                    <textarea placeholder="Message*" {...field} />
                </div>
                <div className="error-message">{errorText}</div>
            </>
        )
    }

    return (
        <div className="input">
            <textarea placeholder="Message*" {...field} />
        </div>
    )
}

export default MessageAreaField
