import * as yup from 'yup'

const formSchema = yup.object().shape({
    rating: yup
        .number()
        .typeError('Rating must be a number')
        .required('Rating is required')
        .positive()
        .min(1, 'Must be above 0')
        .max(10, 'Must be 10 or below')
        .round('floor'),
    completed: yup
        .number()
})

export default formSchema