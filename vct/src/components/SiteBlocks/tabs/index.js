import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './styles.css'

export default class SiteTabs extends Component {

  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    const tabsList = {
      title: ['Акции', 'Новости'],
      items: [
        [{
          src: 'https://vct1.com/images/action/235.jpg.pagespeed.ce.op01VOWB3i.jpg',
          name: 'Новогодняя акция: «Фабрика печати Epson» — выбор Чемпиона!',
          date: '15.11.2018',
          text: 'С 15 ноября по 31 декабря 2018 года купите принтер или МФУ серии «Фабрика печати Epson» и получите в подарок дополнительные контейнеры с оригинальными чернилами Epson и/или упаковку фотобумаги Epson. В некоторых сетях вы сможете оформить беспроцентную рассрочку на устройство или получить другой подарок'
        },
          {
            src: 'http://epson.ua/upload/actions/2018/blackfriday/hero.jpg',
            name: 'Каждый день — «Черная пятница»!',
            date: '15.11.2018',
            text: 'Вместо пятницы, целых две недели скидок на самую популярную технику Epson с 15 по 30 ноября 2018 года. Покупайте принтер, МФУ или проектор со скидкой до 18%!'
          }
        ],
        [{
          src: 'http://epson.ua/upload/resize_cache/iblock/968/381_0_epson/cover-plus-logo.jpg',
          name: 'Epson запускает программу расширенной гарантии Epson CoverPlus',
          date: '24.04.2019',
          text: 'Теперь каждый владелец устройства Epson может продлить стандартную гарантию, купив пакет расширенной гарантии Epson CoverPlus!'
        },
          {
            src: 'https://vct1.com/public/action/epsonwf.jpg.pagespeed.ce.H_ms4AFBmU.jpg',
            name: 'Серия Epson WorkForce Pro',
            date: '04.01.2019',
            text: 'Высокопроизводительные принтеры и МФУ для малого и среднего офиса'
          }
        ]
      ]
    }
    return (
      <div className="tabs">
        <Tabs>
          <TabList>
            {tabsList.title.map(item =>
              <Tab>{item}</Tab>
            )}
          </TabList>
          {tabsList.items.map(item =>
            <TabPanel>
              {item.map(item =>
                <div className="tabs-item">
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
              )}
            </TabPanel>
          )}
        </Tabs>
      </div>
    )
  }

}
