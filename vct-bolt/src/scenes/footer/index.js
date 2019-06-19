import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css';

export default class Footer extends Component {

    render() {
        const footerNavItems = [
            { url: '/', name: 'Главная' },
            { url: '/page-2', name: 'О нас' },
            { url: '/news', name: 'Новости' },
            { url: '/page-4', name: 'Магазин' },
            { url: '/page-1', name: 'Контакты' }
        ];
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <NavLink to="/" className="footer-logo">
                                <img src={require('../../public/image/logo-footer.png')} alt=""/>
                            </NavLink>
                        </div>
                        <div className="col-md-9">
                            <ul className="footer-navigation">
                                {footerNavItems.map((item, index) =>
                                    <li key={item.name + index}>
                                        <NavLink exact to={item.url}>{item.name}</NavLink>
                                    </li>
                                )}
                            </ul>
                            <div className="footer-text">
                                <p>© 2019 krop.com.ua</p>
                                <p>
                                    Компания Krop – может помочь вам в выборе и покупке компьютерной, офисной
                                    техники и её
                                    обслуживанием в Кировоградском регионе.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

}
