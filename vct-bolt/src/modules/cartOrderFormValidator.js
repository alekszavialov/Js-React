// const required = value => value ? undefined : 'Required';
// const maxLength = max => value =>
//     value && value.length > max ? `Must be ${max} characters or less` : undefined;
// const maxLength15 = maxLength(15);
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
// const minValue = min => value =>
//     value && value < min ? `Must be at least ${min}` : undefined;
// const minValue18 = minValue(18);
// const email = value =>
//     value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//         'Invalid email address' : undefined;
// const tooOld = value =>
//     value && value > 65 ? 'You might be too old for this' : undefined;
// const aol = value =>
//     value && /.+@aol\.com/.test(value) ?
//         'Really? You still use AOL for your email?' : undefined;

const validate = values => {
    console.log(values), 'values';
    const errors = {}
    if (!values.firstName) {
        errors.firstName = 'Required'
    } else if (values.firstName.length < 2) {
        errors.firstName = 'Minimum be 2 characters or more'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    } else if (values.lastName.length < 2) {
        errors.lastName = 'Minimum be 2 characters or more'
    }
    console.log(errors);
    return errors;
};

export default validate;