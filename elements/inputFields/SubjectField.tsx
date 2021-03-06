import { useField } from "formik";

const SubjectField = (props: {name: string}) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''

    if (errorText) {
        return (
            <>
                <div className="input is-invalid">
                    <input type="text" className="is-invalid" placeholder="Subject*" {...field} />
                </div>
                <div className="error-message">{errorText}</div>
            </>
        )
    }

    return (
        <div className="input">
            <input type="text" placeholder="Subject*" {...field} />
        </div>
    )
}

export default SubjectField
