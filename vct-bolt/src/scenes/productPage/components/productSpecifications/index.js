import React, { Component, Fragment } from 'react';

import './styles.css';

export default class productSpecification extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { title, data } = this.props;

        return (
            <Fragment>
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
            </Fragment>
        );
    }

}
