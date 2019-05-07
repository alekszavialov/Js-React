import React, {Component} from 'react'
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types'

import BreadCrumbs from '../../components/SiteBlocks/breadCrumbs'
import CarouselElement from '../../components/SiteBlocks/carousel'
import CarouselSmallItem from '../../components/SiteBlocks/carousel/components/carouselSmallItem'
import SiteTabs from "../../components/SiteBlocks/tabs"
import ProductDescription from './components/productDescription'

import {addToCart} from "../../data/Store/actions";
import fetchApi from '../../modules/fetch-api'

import './styles.css'

class ProductPage extends Component {

  static propTypes = {
    onAddToCart: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      productData: null,
      tabsItems: null,
      breadCrumbs: null,
      carouselData: null
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(item) {
    this.props.onAddToCart(item);
  }

  loadProductData = () => {
    fetchApi('../../fakeAPI/productPageData.json')
      .then(result => this.setState({
          productData: result
        }
      ));
  };

  loadPageTabs = () => {
    fetchApi('../../fakeAPI/productPageTabsData.json')
      .then(result => this.setState({
          tabsItems: {
            ...result, items: result.items.map(item =>
              (item.map(item =>
                <div className="tabs-item" key={Math.random()} dangerouslySetInnerHTML={{__html: item.content}}>
                </div>
              ))
            )
          }
        }
      ));
  };

  loadBreadCrumbs = () => {
    fetchApi('../../fakeAPI/productPageBreadCrumbs.json')
      .then(result => this.setState({
          breadCrumbs: result
        }
      ));
  };

  loadCarouselItems = () => {
    fetchApi('../../fakeAPI/carouselManyItemsData.json')
      .then(result => this.setState({
        carouselData: {
          ...result,
          items: result.items.map(item =>
            <CarouselSmallItem key={Math.random()} item={item} onAddToCart={this.addToCart}/>
          )
        }
      }));
  };

  componentDidMount() {
    this.loadProductData();
    this.loadBreadCrumbs();
    this.loadPageTabs();
    this.loadCarouselItems();
  }

  render() {
    return (
      <div className="container">
        <div className="bg-white">
          <div className="product-info-head">
            <div className="row">
              <div className="col-md-12">
                {this.state.breadCrumbs !== null ? (
                  <div className="product-card-tabs">
                    <BreadCrumbs items={this.state.breadCrumbs}/>
                  </div>
                ) : ""}
              </div>
              {this.state.productData !== null ? (
                <ProductDescription data={this.state.productData} onAddToCart={this.addToCart}/>
              ) : ""}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="accompanying-carousel-block">
                <h2 className="seal-lead">Сопутствующие товары:</h2>
                {this.state.carouselData !== null ? (
                  <CarouselElement items={this.state.carouselData.items} params={this.state.carouselData.params}/>
                ) : ""}
              </div>
            </div>
            <div className="col-md-12">
              {this.state.tabsItems !== null ? (
                <div className="product-card-tabs">
                  <SiteTabs items={this.state.tabsItems}/>
                </div>
              ) : ""}
            </div>
            <div className="col-md-12">
              <div className="accompanying-carousel-block">
                <h2 className="seal-lead">Похожие товары на Принтер фабрика печати Epson L132 C11CE58403:</h2>
                {this.state.carouselData !== null ? (
                  <CarouselElement items={this.state.carouselData.items} params={this.state.carouselData.params}/>
                ) : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="accompanying-carousel-block">
                <h2 className="seal-lead block-with-icon icon-eye">Недавно просмотренные товары:</h2>
                {this.state.carouselData !== null ? (
                  <CarouselElement items={this.state.carouselData.items} params={this.state.carouselData.params}/>
                ) : ""}
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

export default connect(null, mapDispatchToProps)(ProductPage)
