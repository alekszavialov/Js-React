import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class ProductDescription extends Component {

  static propTypes = {
    data: PropTypes.object,
    onAddToCart: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    this.props.onAddToCart({
      name: this.props.data.name,
      description: this.props.data.description,
      src: this.props.data.src,
      price: this.props.data.price,
      article: this.props.data.article
    });
  }

  render() {
    return (
      <Fragment>
        <div className="col-md-5">
          <div className="product-img-wrapper">
            <div className="product-img-block">
              <img src={this.props.data.src} alt={this.props.data.name}/>
            </div>
            <div className="products-in-stockroom">
              Остаток на складе: {this.props.data.inStockroom} шт.
            </div>
            <div className="brand-zone">
              <img src={this.props.data.brandImage} alt=""/>
              <span>{this.props.data.brandData}</span>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <h1 className="product-info-name">{this.props.data.name}</h1>
          <div className="product-info-wrapper">
            <div className="product-description">
              <p>{this.props.data.description}</p>
              <div className="product-description-price">{this.props.data.price} <p>грн</p></div>
              <div className="shop-block-buy" onClick={this.addToCart}>Купить</div>
            </div>
            <div className="product-info">
              <h3>Доставка</h3>
              <div className="product-info-delivery-info-block">
                <p>Доставка по Украине:</p>
                <p>Службой &quot;Новая Почта&quot;;</p>
                <p>Службой &quot;Укр Почта&quot;;</p>
              </div>
              <div className="product-info-delivery-info-block">
                <p>Самовывоз:</p>
                <p>г. Кропивницкий, ул. Евгения Тельнова, 14/22;</p>
                <p>г. Кропивницкий, ул. Киевская, 3.</p>
              </div>
              <h3>Оплата</h3>
              <div className="product-info-delivery-info-block">
                <p>Типы оплат:</p>
                <p>Оплата наличными;</p>
                <p>Оплата платежными картами Visa и MasterCard;</p>
                <p>Безналичная оплата;</p>
                <p><strong>Отправка наложенным платежом не осуществляется.</strong></p>
              </div>
            </div>
          </div>
        </div>

      </Fragment>
    )
  }

}
