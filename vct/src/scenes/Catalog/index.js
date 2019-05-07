import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

import SiteTabs from '../../components/SiteBlocks/tabs'
import BreadCrumbs from '../../components/SiteBlocks/breadCrumbs'
import CarouselElement from '../../components/SiteBlocks/carousel'
import ItemCatalog from '../../components/SiteBlocks/itemCatalog'
import SortForm from './components/SortForm'
import ShopTags from './components/shopTags'

import {addToCart} from "../../data/Store/actions";
import fetchApi from '../../modules/fetch-api'

import './styles.css'


class Catalog extends Component {
  static propTypes = {
    onAddToCart: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      catalogItems: null,
      carouselData: null,
      productOptions: null,
      breadCrumbs: null,
      shopTags: null,
      tabsData: null,
      carouselItemsData: null
    };

    this.loadMoreProducts = this.loadMoreProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(item) {
    this.props.onAddToCart(item);
  }

  loadMoreProducts() {
    this.setState({
      catalogItems: [...this.state.catalogItems,
        {
          src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
          href: '/product',
          name: 'Чип для картриджа Pantu21421442142142 fsdafdsafsda m PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
          description: 'M6500/M6607/P220safdfdsa sadfsadf0/P2207/ P2500/P2507',
          price: 124421
        },
        {
          src: 'https://vct1.com/img/sub_menu/sub_menu_proector.jpg.pagespeed.ce.gqCHhkEpSA.jpg',
          href: '/product',
          name: 'Чип для картриджа Pantum PC-210E/211EV (безлимитный) (CHIP-PC-211EV)',
          description: 'M6500/M6607/P2200/P2207/ P2500/P2507',
          price: 3212
        },
      ]
    })
  }

  loadProductList = () => {
    fetchApi('../../fakeAPI/catalogProductItemsData.json')
      .then(result => this.setState({
          catalogItems: result
        }
      ));
  };

  loadCarouselData = () => {
    fetchApi('../../fakeAPI/carouselOneItemData.json')
      .then(result => this.setState({
          carouselData: {
            ...result, items: result.items.map(item =>
              <div key={item.name + Math.random()}>
                <NavLink to={item.url}>
                  <img src={item.src} alt={item.text}/>
                </NavLink>
              </div>
            )
          }
        }
      ));
  };

  loadProductOptions = () => {
    fetchApi('../../fakeAPI/productOptionsData.json')
      .then(result => this.setState({
          productOptions: result
        }
      ));
  };

  loadBreadCrumbs = () => {
    fetchApi('../../fakeAPI/catalogBreadCrumbs.json')
      .then(result => this.setState({
          breadCrumbs: result
        }
      ));
  };

  loadShopTags = () => {
    fetchApi('../../fakeAPI/catalogShopTags.json')
      .then(result => this.setState({
          shopTags: result
        }
      ));
  };

  loadTabsData = () => {
    fetchApi('../../fakeAPI/catalogPageTabsData.json')
      .then(result => this.setState({
        tabsData: {
          ...result, items: result.items.map(item =>
            (item.map(item =>
                <div className="tabs-item" key={Math.random()} dangerouslySetInnerHTML={{__html: item.content}}>
                </div>
              )
            )
          )
        }
      }));
  };

  loadCarouselItems = () => {
    fetchApi('../../fakeAPI/carouselManyItemsData.json')
      .then(result => this.setState({
        carouselItemsData: {
          ...result,
          items: result.items.map(item =>
            <div className="accompanying-product-item" key={Math.random()}>
              <div className="accompanying-product-item-img-wrapper"><img src={item.src} alt=""/></div>
              <NavLink to={item.href}>{item.name}</NavLink>
              <div className="accompanying-product-item-bottom">
                <div className="accompanying-product-item-price">
                  {item.price}
                  <p> грн</p>
                </div>
                <div className="shop-block-buy"
                     onClick={this.addToCart.bind(null, {
                       name: item.name,
                       description: item.description,
                       src: item.src,
                       price: item.price,
                       article: item.article
                     })}
                />
              </div>
            </div>
          )
        }
      }));
  };

  componentWillMount() {
    this.loadProductList();
    this.loadProductOptions();
    this.loadBreadCrumbs();
    this.loadCarouselData();
    this.loadShopTags();
    this.loadTabsData();
    this.loadCarouselItems();
  }

  render() {
    return (
      <div className="container">
        <div className="bg-white">
          <div className="row">
            <div className="col-md-3">
              {this.state.productOptions !== null ?
                <SortForm
                  sliderValues={this.state.productOptions.sliderValues}
                  productParameters={this.state.productOptions.productParameters}
                /> :
                ""
              }
            </div>
            <div className="col-md-9">
              {this.state.breadCrumbs !== null ? <BreadCrumbs items={this.state.breadCrumbs}/> : ""}
              {this.state.carouselData !== null ?
                <CarouselElement items={this.state.carouselData.items} params={this.state.carouselData.params}/> :
                ""
              }
              {this.state.shopTags !== null ? <ShopTags items={this.state.shopTags}/> : ""}
              <div className="catalog-shop-blocks">
                {this.state.catalogItems !== null ?
                  <Fragment>
                    <ItemCatalog items={this.state.catalogItems} onAddToCart={this.addToCart}/>
                    <div className="shop-blocks-load-more shop-block-buy" onClick={this.loadMoreProducts}>
                      Загрузить еще
                    </div>
                  </Fragment> :
                  ""
                }
              </div>
              <div className="product-card-tabs">
                {this.state.tabsData !== null ? <SiteTabs items={this.state.tabsData}/> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="accompanying-carousel-block">
                {this.state.carouselItemsData !== null ?
                  <Fragment>
                    <h2 className="seal-lead block-with-icon icon-thumbs-up">Популярные позиции в категории:</h2>
                    <CarouselElement items={this.state.carouselItemsData.items}
                                     params={this.state.carouselItemsData.params}/>
                  </Fragment> :
                  ""
                }
              </div>
            </div>
            <div className="col-md-12">
              <div className="accompanying-carousel-block">
                {this.state.carouselItemsData !== null ?
                  <Fragment>
                    <h2 className="seal-lead block-with-icon icon-thumbs-up">Недавно просмотренные товары:</h2>
                    <CarouselElement items={this.state.carouselItemsData.items}
                                     params={this.state.carouselItemsData.params}/>
                  </Fragment> :
                  ""
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(Catalog)
