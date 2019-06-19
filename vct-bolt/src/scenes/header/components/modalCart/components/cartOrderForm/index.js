import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import RenderField from './components/renderField';
import cartOrderFormValidator from '../../../../../../modules/cartOrderFormValidator';

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

    // fields = [
    //     { name: 'name', placeholder: 'Имя', required: true, object: 'input', type: 'text' },
    //     { name: 'surname', placeholder: 'Фамилия', required: true, object: 'input', type: 'text' },
    //     { name: 'town', placeholder: 'Город', required: true, object: 'input', type: 'text' },
    //     { name: 'phone', placeholder: 'Номер телефона', required: true, object: 'input', type: 'tel' },
    //     { name: 'email', placeholder: 'Email', required: true, object: 'input', type: 'email' },
    //     {
    //         name: 'payOptions',
    //         object: 'select',
    //         options: [
    //             'Оплата на карту Приват Банка',
    //             'Оплата через мобильное приложение Приват Банка',
    //             'Оплата по безналичному расчету (без НДС)',
    //             'Оплата по безналичному расчету (с НДС)',
    //             'Оплата на месте в магазине (только для Кропивницкого)'
    //         ]
    //     },
    //     {
    //         name: 'deliveryOptions',
    //         object: 'select',
    //         options: [
    //             'Доставка в регионы службой "Новая Почта"',
    //             'Доставка в регионы службой "Укр Почта" +10грн за упаковку',
    //             'Доставка в регионы другой службой доставки (от 500грн)',
    //             'Самовывоз из точки выдачи',
    //             'Доставка курьером по городу Кропивницкий (от 250грн)'
    //         ]
    //     },
    //     {
    //         name: 'comment',
    //         placeholder: 'Комментарий к заказу, реквизиты доставки НП и т д...',
    //         object: 'textarea'
    //     },
    //     { name: 'promo', placeholder: 'Промокод', object: 'input', type: 'text' }
    // ];

    render() {
        const { pristine, submitting, invalid } = this.props;
        return (
            <form className="modal-cart-order" onSubmit={this.handleSubmit}>
                <Field
                    name="name"
                    type="text"
                    component={RenderField}
                    params={{ name: 'name', placeholder: 'Имя', required: true, object: 'input', type: 'text' }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="surname"
                    type="text"
                    component={RenderField}
                    params={{ name: 'surname', placeholder: 'Фамилия', required: true, object: 'input', type: 'text' }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="town"
                    type="text"
                    component={RenderField}
                    params={{ name: 'town', placeholder: 'Город', required: true, object: 'input', type: 'text' }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="phone"
                    type="tel"
                    component={RenderField}
                    params={{ name: 'phone', placeholder: 'Номер телефона', required: true, object: 'input', type: 'tel' }}
                    validate={cartOrderFormValidator}
                />
                <p className="sale_box_phone_text">Телефон для обратной связи. Например : <br/>
                    <a>+380951234567</a>
                </p>
                <Field
                    name="email"
                    type="email"
                    component={RenderField}
                    params={{ name: 'email', placeholder: 'Email', required: true, object: 'input', type: 'email' }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="payOptions"
                    component={RenderField}
                    params={{
                        name: 'payOptions',
                        object: 'select',
                        options: [
                            'Оплата на карту Приват Банка',
                            'Оплата через мобильное приложение Приват Банка',
                            'Оплата по безналичному расчету (без НДС)',
                            'Оплата по безналичному расчету (с НДС)',
                            'Оплата на месте в магазине (только для Кропивницкого)'
                        ],
                        required: true
                    }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="deliveryOptions"
                    component={RenderField}
                    params={{
                        name: 'deliveryOptions',
                        object: 'select',
                        options: [
                            'Доставка в регионы службой "Новая Почта"',
                            'Доставка в регионы службой "Укр Почта" +10грн за упаковку',
                            'Доставка в регионы другой службой доставки (от 500грн)',
                            'Самовывоз из точки выдачи',
                            'Доставка курьером по городу Кропивницкий (от 250грн)'
                        ],
                        required: true
                    }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="deliveryAddress"
                    type="text"
                    component={RenderField}
                    params={{ name: 'deliveryAddress', placeholder: 'Адресс или номер отделения', required: true, object: 'input', type: 'text' }}
                    validate={cartOrderFormValidator}
                />
                <Field
                    name="comment"
                    component={RenderField}
                    params={{
                        name: 'comment',
                        placeholder: 'Комментарий к заказу, реквизиты доставки НП и т д...',
                        object: 'textarea'
                    }}
                    validate={cartOrderFormValidator}
                />
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
    form: 'submitOrder'
})(CartOrderForm);

export default CartOrderForm;
