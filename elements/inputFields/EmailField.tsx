import { useField } from "formik";
import { useTranslation } from "next-i18next";

const EmailField = (props: { name: string }) => {
    const { t } = useTranslation("home");
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    if (errorText) {
        return (
            <>
                <div className="input is-invalid">
                    <input type="email" placeholder="E-Mail*" {...field} />
                </div>
                <div className="error-message">{t(`${errorText}`)}</div>
            </>
        );
    }

    return (
        <div className="input">
            <input type="email" placeholder="E-Mail*" {...field} />
        </div>
    );
};

export default EmailField;
