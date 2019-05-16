const requiredCheck = data => (data ? undefined : 'Поле обязательное для заполнения');
const maxLengthCheck = (data, max) =>
    data && data.length > max ? `Должно быть ${max} символов или меньше` : undefined;
const minLengthCheck = (data, min) =>
    data && data.length < min ? `Должно быть ${min} символов или больше` : undefined;
const wordsCheck = data =>
    data && !/^([a-zA-Z]|[\u0400-\u04FF])+$/i.test(data) ? 'Доступны только буквы' : undefined;
const emailCheck = data =>
    data && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data)
        ? 'Неверный EMail'
        : undefined;
const phoneNumberCheck = data =>
    data && !/^(\+380(50|66|95|99|63|93|73|67|96|97|98|68)[0-9]{7})$/i.test(data) ?
        'Неверный номер телефона, должно быть 13 символов' :
        undefined;

export default function cartOrderFormValidator(value, allValues, formProps, name) {
    let errors = [];
    if (value !== undefined){
        value = value.trim();
    }
    switch (name) {
        case 'name':
        case 'surname' :
        case 'town' :
            errors.push(requiredCheck(value));
            errors.push(maxLengthCheck(value, 25));
            errors.push(minLengthCheck(value, 2));
            errors.push(wordsCheck(value));
            break;
        case 'phone':
            errors.push(requiredCheck(value));
            errors.push(phoneNumberCheck(value));
            break;
        case 'email':
            errors.push(requiredCheck(value));
            errors.push(emailCheck(value));
            break;
        case 'payOptions':
        case 'deliveryOption':
            errors.push(requiredCheck(value));
            break;
        default:
            break;
    }
    errors = errors.filter(item => item !== undefined);
    return errors.length > 0 ? errors[0] : undefined;
};