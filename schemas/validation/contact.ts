import { object, string } from 'yup'

export const contact = () => {
    return object({
        email: string().email('validation.valid-email').required('validation.required-email'),
        subject: string().required('validation.required-subject'),
        message: string().required('validation.required-message').min(10, 'validation.min-message'),
    })
}
