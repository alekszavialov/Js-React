import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import RenderField from './components/renderField';

const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;
const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined;

class CartOrderForm extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit();
    }

// <input name="name_z" placeholder="Имя" type="text" alt="Ваше имя" required=""/>
// <input name="lastname_z" placeholder="Фамилия" type="text" alt="Ваша фамилия" required=""/>
//         <input name="town_z" placeholder="Город" type="text" alt="" required=""/>
//         <input name="phone_z" className="sale_box_phone" placeholder="+380" type="text"
//     alt="Ваш номер телефона в международном формате" required=""/>
//         <p className="sale_box_phone_text">Телефон для обратной связи. Например : <br/>
// <a>+38 095 123 45 67</a></p>
//
// <input name="Email_z" placeholder="E-mail" type="text" alt="Ваш Email" required=""/>
//         <select name="" id="">
//         <option>Оплата на карту Приват Банка</option>
// <option>Оплата через мобильное приложение Приват Банка</option>
// <option>Оплата по безналичному расчету (без НДС)</option>
// <option>Оплата по безналичному расчету (с НДС)</option>
// <option>Оплата на месте в магазине (только для Кропивницкого)</option>
// </select>
// <select name="" id="">
//         <option>Оплата на карту Приват Банка</option>
// <option>Оплата через мобильное приложение Приват Банка</option>
// <option>Оплата по безналичному расчету (без НДС)</option>
// <option>Оплата по безналичному расчету (с НДС)</option>
// <option>Оплата на месте в магазине (только для Кропивницкого)</option>
// </select>
// <textarea name="comment_z"
//     placeholder="Комментарий к заказу, реквизиты доставки НП и т д..."/>
//         <input name="promo_z" placeholder="Промокод" type="text" alt="Промокод"/>
//         <p>Важно! Необходимо указать и проверить все заполненные данные, что бы менеджер связался с
//     Вами в
//     ближайшее
//     время.</p>
// <button>
// <img src="https://vct1.com/img/sale_ok_bnt.png.pagespeed.ce.Eru4ouLGgs.png"
//     alt="Кнопка оформления заказа"
//     title="Оформить заказ"/>
//         </button>

    render() {
        return (
            <form className="modal-cart-order" onSubmit={this.handleSubmit}>
                <h4>Оформление заказа</h4>
                <Field
                    name="username"
                    component={<RenderField/>}
                />
                <button type="submit" label="submit">Submit</button>
            </form>
        );
    }
}

CartOrderForm = reduxForm({
    form: 'submitOrder'
})(CartOrderForm);

export default CartOrderForm;
