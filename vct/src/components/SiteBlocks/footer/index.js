import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class Footer extends Component{

  static propTypes = {

  }

  constructor(props){
    super(props)
  }

  render(){
    const footerNavItems = [
      {url: '#', name: 'Помощь'},
      {url: '#', name: 'О нас'},
      {url: '#', name: 'Акции'},
      {url: '#', name: 'Новости'},
      {url: '#', name: 'Оплата и доставка'},
      {url: '#', name: 'Оптовым клиентам'},
    ]
    return(
      <footer>
<div className="container">
  <div className="row">
    <div className="col-md-3">
      <a href="#" className="footer-logo">
        <img src="https://vct1.com/img/logo_footer.png.pagespeed.ce.HTy2SE8LEQ.png" alt=""/>
      </a>
    </div>
    <div className="col-md-9">
      <ul className="footer-navigation">
        {footerNavItems.map(item =>
        <li>
          <a href={item.url}>{item.name}</a>
        </li>
        )}
      </ul>
      <div className="footer-text">
        <p>© 2019 VCT1.com</p>
        <p>
          Компания ВКТ Сервис – может помочь вам в выборе и покупке компьютерной, офисной техники и её обслуживанием в Кировоградском регионе. С 2001 года успешно оказывает услуги по ремонту компьютерной, печатающей, банковской техники и сегодня, представляет собой авторизованный сервисный центр Epson, Canon, IMPRESSION, а также других всемирно известных брендов.
        </p>
      </div>
    </div>
  </div>
</div>
      </footer>
    )
  }

}
