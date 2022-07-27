import { useField } from "formik";
import {useTranslation} from "next-i18next";

const NameField = (props: {name: string}) => {
    const { t } = useTranslation('common')
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''

    if (errorText) {
        return (
            <div className="input is-invalid">
                <input type="text" className="is-invalid" placeholder={t('name')} {...field} />
                <div className="error-message">{errorText}</div>
            </div>
        )
    }

    return (
        <div className="input">
            <input type="text" id="name" className="is-invalid" placeholder={t('name')} {...field} />
        </div>
    )
}

export default NameField
