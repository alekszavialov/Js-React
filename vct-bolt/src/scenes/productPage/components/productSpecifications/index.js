import React, { Component } from 'react';

import './styles.css';

export default class ProductSpecification extends Component {

    constructor(props) {
        super(props);
        console.log('ProductSpecification');
    }

    render() {
        const { title, data } = this.props;

        return (
            <div className="product-specification-block">
                <h2>Характеристики {title}</h2>
                {data.map(item =>
                    <div className="product-specification-item" key={item.description.split('').reduce((a, b) => {
                        a = ((a << 5) - a) + b.charCodeAt(0);
                        return a & a;
                    }, 0)}>
                        <div className="product-specification-item-title">
                            {item.description}
                        </div>
                        <div className="product-specification-item-value">
                            <p dangerouslySetInnerHTML={{ __html: item.value }}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
