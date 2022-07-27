import { useField } from "formik";
import {useTranslation} from "next-i18next";

const MessageAreaField = (props: {name: string}) => {
    const { t } = useTranslation('common')
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''

    if (errorText) {
        return (
            <>
                <div className="input is-invalid">
                    <textarea placeholder={`${t('message')}*`} {...field} />
                </div>
                <div className="error-message">{errorText}</div>
            </>
        )
    }

    return (
        <div className="input">
            <textarea placeholder={`${t('message')}*`} {...field} />
        </div>
    )
}

export default MessageAreaField
