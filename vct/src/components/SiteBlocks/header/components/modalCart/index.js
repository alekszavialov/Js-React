import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ShoppingCartModal extends Component {

  static propTypes = {
    items: PropTypes.array,
    onChangeQuantity: PropTypes.func,
    handleClose: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeCart = this.closeCart.bind(this);
    this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
  }

  closeCart() {
    this.props.handleClose();
  }

  changeQuantityInCart(e){
    this.props.onChangeQuantity({article: e.target.id, quantity: e.target.value})
  }

  loadCart = () => {
    return this.props.items.map(item =>
      <div className="modal-cart-items-shopped-item" key={item.article}>
        <div className="modal-cart-items-shopped-item-img">
          <a href="#">
            <img src={item.src}
                 alt={`image of ${item.name}`}/>
          </a>
        </div>
        <div className="modal-cart-items-shopped-item-info">
          <a href="#">{item.name}</a>
          <p>{item.description}</p>
          <div className="modal-cart-items-shopped-item-info-price">
            {item.price}<p>грн</p>
          </div>
          <div className="modal-cart-items-shopped-item-info-count">
            <p>Количество(шт.)</p>
            <input value={item.quantity} min="1" max="99" id={item.article} onChange={this.changeQuantityInCart} type="number"/>
          </div>
        </div>
      </div>
    )
  };

  render() {
    return (
      <div className="modal-cart-bg">
        <div className={`modal-cart`}>
          <form method="POST">
            <div className="modal-cart-order">
              <h4>Оформление заказа</h4>
              <input name="name_z" placeholder="Имя" type="text" alt="Ваше имя" required=""/>
              <input name="lastname_z" placeholder="Фамилия" type="text" alt="Ваша фамилия" required=""/>
              <input name="town_z" placeholder="Город" type="text" alt="" required=""/>
              <input name="phone_z" className="sale_box_phone" placeholder="+380" type="text"
                     alt="Ваш номер телефона в международном формате" required=""/>
              <p className="sale_box_phone_text">Телефон для обратной связи. Например : <br/>
                <a>+38 095 123 45 67</a></p>

              <input name="Email_z" placeholder="E-mail" type="text" alt="Ваш Email" required=""/>
              <select name="" id="">
                <option>Оплата на карту Приват Банка</option>
                <option>Оплата через мобильное приложение Приват Банка</option>
                <option>Оплата по безналичному расчету (без НДС)</option>
                <option>Оплата по безналичному расчету (с НДС)</option>
                <option>Оплата на месте в магазине (только для Кропивницкого)</option>
              </select>
              <select name="" id="">
                <option>Оплата на карту Приват Банка</option>
                <option>Оплата через мобильное приложение Приват Банка</option>
                <option>Оплата по безналичному расчету (без НДС)</option>
                <option>Оплата по безналичному расчету (с НДС)</option>
                <option>Оплата на месте в магазине (только для Кропивницкого)</option>
              </select>
              <textarea name="comment_z" placeholder="Комментарий к заказу, реквизиты доставки НП и т д..."/>
              <input name="promo_z" placeholder="Промокод" type="text" alt="Промокод"/>
              <p>Важно! Необходимо указать и проверить все заполненные данные, что бы менеджер связался с Вами в
                ближайшее
                время.</p>
              <button><img src="https://vct1.com/img/sale_ok_bnt.png.pagespeed.ce.Eru4ouLGgs.png"
                           alt="Кнопка оформления заказа"
                           title="Оформить заказ"/></button>
            </div>
            <div className="modal-cart-items">
              <div className="modal-cart-items-shopped">
                {this.loadCart()}
              </div>
              <div className="modal-cart-items-pay">
                <span>К оплате</span>
                <div className="modal-cart-items-shopped-item-info-price">
                  {this.props.items.reduce((acc,item) => acc+item.price*item.quantity, 0)} <p>грн</p>
                </div>
              </div>
              <button onClick={this.closeCart}><img src="https://vct1.com/img/continue_shop.png" alt=""/></button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}
