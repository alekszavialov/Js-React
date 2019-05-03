import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import CarouselElement from '../../components/SiteBlocks/carousel'
import CategoriesItems from './components/categoriesItems'
import ItemCatalog from '../../components/SiteBlocks/itemCatalog'
import SiteTabs from '../../components/SiteBlocks/tabs'

import './styles.css'

export default class MainPage extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
  }


  render() {
    const carouselItems = [
      {
        url: '#',
        src: 'https://vct1.com/img/slider/epson_service.jpg.pagespeed.ce.CzIKBqmjM-.jpg',
        text: 'Банер слайдера.'
      },
      {
        url: '#',
        src: 'https://vct1.com/img/slider/pantum.jpg.pagespeed.ce.934YCqpgyu.jpg',
        text: 'Банер слайдера.'
      },
    ].map(item =>
      <div key={item.name + Math.random()}>
        <a href={item.url}>
          <img src={item.src} alt={item.text}/>
        </a>
      </div>
    );
    const popularCategoriesItems = [
      {
        url: '#',
        src: 'https://vct1.com/img/sub_menu/sub_menu_mfu.jpg.pagespeed.ce.UTgcIIgvPS.jpg',
        text: 'Epson - лидер в качественной печати'
      },
      {
        url: '#',
        src: 'https://vct1.com/img/sub_menu/sub_menu_chernila.jpg.pagespeed.ce.EqRni30KVl.jpg',
        text: 'Original inks for Epson'
      },
      {
        url: '#',
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        text: 'Projectors Epson'
      },
      {
        url: '#',
        src: 'https://vct1.com/img/sub_menu/sub_menu_zip_epson.jpg.pagespeed.ce.maK387tVUr.jpg',
        text: 'Запчасти для принтеров Epson'
      }
    ];
    const catalogItems = [
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 324
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 324
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для Чип для картриджа Pantu21421442142142 fsdafdsafsda m PC-210E/211EV (безлимитный) (CHIP-PC-211EV) Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 324
      },
      {
        banner: true,
        src: 'https://vct1.com/public/banner/epson1.gif.pagespeed.ce.dW-zURdo30.gif',
        href: '#'
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 324
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantu21421442142142 fsdafdsafsda m PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P220safdfdsa sadfsadf0/P2207/ P2500/P2507',
        price: 124421
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 3212
      },
    ];
    const newCatalogItems = [
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 324
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_chernila.jpg.pagespeed.ce.EqRni30KVl.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 33
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 44
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 55
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_chernila.jpg.pagespeed.ce.EqRni30KVl.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 66
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 77
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 88
      },
      {
        src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
        href: '#',
        name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
        description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
        price: 99
      },
    ].map(item =>
      <div className="accompanying-product-item">
        <div className="accompanying-product-item-img-wrapper"><img src={item.src} alt=""/></div>
        <a href={item.href}>{item.name}</a>
        <div className="accompanying-product-item-bottom">
          <div className="accompanying-product-item-price">
            {item.price}
            <p> грн</p>
          </div>
          <a href="#" className="shop-block-buy"></a>
        </div>
      </div>
    );
    // const params = {autoPlay: true, showStatus: false, showThumbs: false, infiniteLoop: true, emulateTouch: true};
    const params = {
      responsive: {
        0: {items: 1},
        1024: {items: 1},
      },
      autoPlayInterval: 5000,
      autoPlayDirection: "rtl",
      autoPlay: true,
      buttonsDisabled: true,
      fadeOutAnimation: true,
      disableAutoPlayOnAction: true,
    };
    const newParams = {
      responsive: {
        0: {items: 1},
        1024: {items: 6},
      },
      autoPlayInterval: 15000,
      autoPlayDirection: "ltr",
      dotsDisabled: true,
      autoPlay: true,
      disableAutoPlayOnAction: true,
    };
    return (
      <Fragment>
        <div className="container">
          <div className="bg-white">
            <div className="row">
              <div className="col-md-12">
                <CarouselElement items={carouselItems} params={params}/>
              </div>
              <div className="col-md-12">
                <h2 className="seal-lead">Популярные категории товаров:</h2>
                <CategoriesItems items={popularCategoriesItems}/>
              </div>
              <div className="col-md-12">
                <h2 className="seal-lead">Популярные товары:</h2>
                <ItemCatalog items={catalogItems}/>
              </div>
              <div className="col-md-12 accompanying-carousel-block">
                <h2 className="seal-lead">Новые товары в интернет магазине:</h2>
                <div className="accompanying-carousel-block-wrapper">
                  <CarouselElement items={newCatalogItems} params={newParams}/>
                </div>
              </div>
              <div className="col-md-12">
                <SiteTabs/>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-shop">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="about-corp trophy">
                  <h3>20 лет на рынке IT в Украине</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="about-corp certificate">
                  <h3>Cертифицированный товар</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="about-corp cogs">
                  <h3>Идеальное обслуживание</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>


    )
  }

}


