import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeliveryAndPay from '../deliveryAndPay';
import ProductSpecification from '../productSpecifications';
import ProductCommentBlock from '../productComment';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './styles.css';

export default class ProductTabs extends Component {

    static propTypes = {
        items: PropTypes.object
    };

    constructor(props) {
        super(props);
    }
    // const specification = <ProductSpecification
    //     title={productData[0].title}
    //     data={specifications}/>;
    // const delivery = <DeliveryAndPay
    //     title={productData[0].title}/>;
    // const comment = <ProductCommentBlock
    //     changeFormField={this.changeFormField}
    //     title={productData[0].title}
    //     data={comments}/>;

// {this.props.items.items.map(item =>
// <TabPanel key={Math.random()}>
// {item}
// </TabPanel>
// )}

    render() {
        return (
            <div className="tabs">
                <Tabs defaultIndex={this.props.items.defaultIndex} forceRenderTabPanel>
                    <TabList>
                        {this.props.items.title.map(item =>
                            <Tab disabled={!item.enabled} key={Math.random()}>{item.name}</Tab>
                        )}
                    </TabList>

                    <TabPanel key={Math.random()}>
                        {this.props.items.items[0]}
                    </TabPanel>
                    <TabPanel key={Math.random()}>
                        <ProductSpecification {...this.props.items.items[1]}/>
                    </TabPanel>
                    <TabPanel key={Math.random()}>
                        <DeliveryAndPay {...this.props.items.items[2]}/>
                    </TabPanel>
                    <TabPanel key={Math.random()}>
                        <ProductCommentBlock {...this.props.items.items[3]}/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }

}
