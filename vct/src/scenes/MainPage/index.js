import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CarouselElement from '../../components/SiteBlocks/carousel'
import CategoriesItems from './components/categoriesItems'
import ItemCatalog from '../../components/SiteBlocks/itemCatalog'
import SiteTabs from '../../components/SiteBlocks/tabs'

import {addToCart} from '../../data/Store/actions';
import fetchApi from '../../modules/fetch-api'

import './styles.css'

class MainPage extends Component {

  static propTypes = {
    onAddToCart: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      carouselData: null,
      carouselItemsData: null,
      popularItemsData: null,
      catalogItems: null,
      tabItems: null
    };

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(item){
    this.props.onAddToCart(item);
  }

  loadCarouselData = () => {
    fetchApi('../../fakeAPI/carouselOneItemData.json')
      .then(result => this.setState({
          carouselData: {
            ...result, items: result.items.map(item =>
              <div key={item.name + Math.random()}>
                <a href={item.url}>
                  <img src={item.src} alt={item.text}/>
                </a>
              </div>
            )
          }
        }
      ));
  };

  loadPopularItemsData = () => {
    fetchApi('../../fakeAPI/mainPopularCategoriesItems.json')
      .then(result => this.setState({
          popularItemsData: result
        }
      ));
  };

  loadCatalogItemsData = () => {
    fetchApi('../../fakeAPI/catalogItems.json')
      .then(result => this.setState({
          catalogItems: result
        }
      ));
  };

  loadCarouselItems = () => {
    fetchApi('../../fakeAPI/carouselManyItemsData.json')
      .then(result => this.setState({
        carouselItemsData: {
          ...result,
          items: result.items.map(item =>
            <div className="accompanying-product-item" key={Math.random()}>
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
          )
        }
      }));
  };

  loadPageTabItems = () => {
    fetchApi('../../fakeAPI/mainPageTabsData.json')
      .then(result => this.setState({
          tabItems: {
            ...result, items: result.items.map(item =>
              (item.map(item =>
                <div className="tabs-item" key={Math.random()}>
                  <div className="tabs-item-image">
                    <a href="#">
                      <img src={item.src} alt=""/>
                    </a>
                  </div>
                  <div className="tabs-item-content">
                    <h3>
                      <a href="#">{item.name}</a>
                    </h3>
                    <span>{item.date}</span>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))
            )
          }
        }
      ));
  };

  componentDidMount() {
    this.loadCarouselData();
    this.loadPopularItemsData();
    this.loadCatalogItemsData();
    this.loadCarouselItems();
    this.loadPageTabItems();
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="bg-white">
            <div className="row">
              <div className="col-md-12">
                {this.state.carouselData !== null ?
                  <CarouselElement items={this.state.carouselData.items} params={this.state.carouselData.params}/> :
                  ""
                }
              </div>
              <div className="col-md-12">
                {this.state.popularItemsData !== null ?
                  <Fragment>
                    <h2 className="seal-lead">Популярные категории товаров:</h2>
                    <CategoriesItems items={this.state.popularItemsData}/>
                  </Fragment> :
                  ""
                }
              </div>
              <div className="col-md-12">
                {this.state.catalogItems !== null ?
                  <Fragment>
                    <h2 className="seal-lead">Популярные товары:</h2>
                    <ItemCatalog items={this.state.catalogItems} onAddToCart={this.addToCart}/>
                  </Fragment> :
                  ""
                }
              </div>
              <div className="col-md-12 accompanying-carousel-block">
                {this.state.carouselItemsData !== null ?
                  <Fragment>
                    <h2 className="seal-lead">Новые товары в интернет магазине:</h2>
                    <div className="accompanying-carousel-block-wrapper">
                      <CarouselElement
                        items={this.state.carouselItemsData.items}
                        params={this.state.carouselItemsData.params}/>
                    </div>
                  </Fragment> :
                  ""
                }
              </div>
              <div className="col-md-12">
                {this.state.tabItems !== null ?
                  <SiteTabs items={this.state.tabItems}/>
                  :
                  ""
                }
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(MainPage)
