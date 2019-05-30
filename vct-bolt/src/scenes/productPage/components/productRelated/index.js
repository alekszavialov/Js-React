import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemCatalog from '../../../../components/itemCatalog';

import './styles.css';

export default class ProductRelated extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        onAddToCart: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {items, onAddToCart} = this.props;
        return (
            <div className="poduct-related-products">
                <h2>Сопутствующие товары для {this.props.title}</h2>
                <ItemCatalog
                    items={items.map(item => {
                        return{
                            title: item.name,
                            description: item.description,
                            img: item.src,
                            price: item.price,
                            id: item.article,
                            url: item.href
                        };
                    })}
                    onAddToCart={onAddToCart}
                />
            </div>
        );
    }
}

