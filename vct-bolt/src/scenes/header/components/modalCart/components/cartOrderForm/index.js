import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import RenderField from './components/renderField';
import validate from '../../../../../../modules/cartOrderFormValidator';

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
        console.log('submit');
        // this.props.handleSubmit();
    }

    fields = [
        { name: 'name', placeholder: 'Имя', required: true, object: 'input', type: 'text' },
        { name: 'surname', placeholder: 'Фамилия', required: true, object: 'input', type: 'text' },
        { name: 'town', placeholder: 'Город', required: true, object: 'input', type: 'text' },
        { name: 'phone', placeholder: 'Номер телефона', required: true, object: 'input', type: 'tel' },
        { name: 'email', placeholder: 'Email', required: true, object: 'input', type: 'email' },
        {
            name: 'payOptions',
            object: 'select',
            options: [
                'Оплата на карту Приват Банка',
                'Оплата через мобильное приложение Приват Банка',
                'Оплата по безналичному расчету (без НДС)',
                'Оплата по безналичному расчету (с НДС)',
                'Оплата на месте в магазине (только для Кропивницкого)'
            ]
        },
        {
            name: 'comment',
            placeholder: 'Комментарий к заказу, реквизиты доставки НП и т д...',
            object: 'textarea'
        },
        { name: 'promo', placeholder: 'Промокод', object: 'input', type: 'text' }
    ];

// <input name="name_z" placeholder="Имя" type="text" alt="Ваше имя" required=""/>
// <input name="lastname_z" placeholder="Фамилия" type="text" alt="Ваша фамилия" required=""/>
//         <input name="town_z" placeholder="Город" type="text" alt="" required=""/>
//         <input name="phone_z" className="sale_box_phone" placeholder="+380" type="text"
//     alt="Ваш номер телефона в международном формате" required=""/>

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


    render() {
        const { pristine, submitting, invalid } = this.props;
        console.log(this.fields);
        return (
            <form className="modal-cart-order" onSubmit={this.handleSubmit}>
                <h4>Оформление заказа</h4>
                {this.fields.map(
                    (item, index) => {
                        return (
                            <Fragment key={Math.random()}>
                                <Field
                                    name={item.name}
                                    component={RenderField}
                                    params={item}
                                />
                                {index === 4 &&
                                <p className="sale_box_phone_text">Телефон для обратной связи. Например : <br/>
                                    <a>+38 095 123 45 67</a>
                                </p>
                                }

                            </Fragment>
                        );
                    }
                )}
                <p>Важно! Необходимо указать и проверить все заполненные данные, что бы менеджер связался с
                    Вами в
                    ближайшее
                    время.</p>
                <button type="submit" disabled={invalid || submitting || pristine}>
                    <img
                        src="https://vct1.com/img/sale_ok_bnt.png.pagespeed.ce.Eru4ouLGgs.png"
                        alt="Кнопка оформления заказа"
                        title="Оформить заказ"/>
                </button>
            </form>
        );
    }
}

CartOrderForm = reduxForm({
    form: 'submitOrder',
    validate
})(CartOrderForm);

export default CartOrderForm;
