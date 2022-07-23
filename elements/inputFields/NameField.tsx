import { useField } from "formik";

const NameField = (props: {name: string}) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''

    if (errorText) {
        return (
            <div className="input is-invalid">
                <input type="text" className="is-invalid" placeholder="Name" {...field} />
                <div className="error-message">{errorText}</div>
            </div>
        )
    }

    return (
        <div className="input">
            <input type="text" id="name" className="is-invalid" placeholder="Name" {...field} />
        </div>
    )
}

export default NameField
