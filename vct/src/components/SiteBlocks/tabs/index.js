import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './styles.css'

export default class SiteTabs extends Component {

  static propTypes = {
    items: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="tabs">
        <Tabs defaultIndex={this.props.items.defaultIndex}>
          <TabList>
            {this.props.items.title.map(item =>
              <Tab key={Math.random()}>{item}</Tab>
            )}
          </TabList>
          {this.props.items.items.map(item =>
            <TabPanel key={Math.random()}>
              {item}
            </TabPanel>
          )}
        </Tabs>
      </div>
    )
  }

}
