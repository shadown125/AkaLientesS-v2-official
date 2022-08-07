import { useField } from "formik";
import { useTranslation } from "next-i18next";

const SubjectField = (props: { name: string }) => {
    const { t } = useTranslation();
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    if (errorText) {
        return (
            <>
                <div className="input is-invalid">
                    <input type="text" className="is-invalid" placeholder={`${t("common:subject")}*`} {...field} />
                </div>
                <div className="error-message">{t(`home:${errorText}`)}</div>
            </>
        );
    }

    return (
        <div className="input">
            <input type="text" placeholder={`${t("common:subject")}*`} {...field} />
        </div>
    );
};

export default SubjectField;
