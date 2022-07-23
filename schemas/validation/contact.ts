import { object, string } from 'yup'

export const contact = () => {
    return object({
        email: string().email('E-Mail must be valid').required('Email is required field. Please fill it to continue'),
        subject: string().required('Subject is required field. Please fill it to continue'),
        message: string().required('Message is required field. Please fill it to continue').min(10, 'Message must have at least 10 characters'),
    })
}
