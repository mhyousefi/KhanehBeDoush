import React, { Component } from 'react'
import 'src/styles/SearchResultsPage/SearchBox.css'
import SearchBoxItem from './SearchBoxItem'

const house1 = {
  'area': '۲۲۰',
  'district': 'قیطریه',
  'dealType': 'rental',
  'priceInfo': {
    'sellPrice': '۱۰۰۰۰۰۰',
    'rentPrice': '۲۰۰۰',
    'basePrice': '۳۰۰۰',
  },
  'image': '',
}

const house2 = {
  'area': '۱۱۰',
  'district': 'امیر آباد',
  'dealType': 'sell',
  'priceInfo': {
    'sellPrice': '۵۰۰۰۰۰',
    'rentPrice': '۶۰۰',
    'basePrice': '۷۶۰',
  },
  'image': '',
}

export default class SearchBox extends Component {
  render () {
    return (
      <div className="searchBoxContainer">
        <div className="searchBoxRow">
          <SearchBoxItem
            dealType={house1['dealType']}
            area={house1['area']}
            district={house1['district']}
            priceInfo={house1['priceInfo']}
          />
          <SearchBoxItem
            dealType={house2['dealType']}
            area={house2['area']}
            district={house2['district']}
            priceInfo={house2['priceInfo']}
          />
        </div>
      </div>
    )
  }
}