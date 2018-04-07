import React, { Component } from 'react'
import 'src/styles/SearchResultsPage/SearchBox.css'
import SearchBoxItem from './SearchBoxItem'


export default class SearchBox extends Component {
  _createSearchBoxes = (houses) => {
    let rows = []
    let rowCount = houses.length / 2
    for (let i = 0; i < rowCount; i++) {
      rows.push(this._createSearchBoxRow(houses, 2 * i))
    }
    return rows
  }

  _createSearchBoxRow = (houses, strIndex) => {
    let rowHeight = (!houses[strIndex + 1]) ? '500px' : ''
    return (
      <div className="searchBoxRow" style={{height: rowHeight}}>
        <SearchBoxItem
          dealType={houses[strIndex]['dealType']}
          area={houses[strIndex]['area']}
          district={houses[strIndex]['district']}
          priceInfo={houses[strIndex]['priceInfo']}
          imageUrl={houses[strIndex]['image']}
          houseId={houses[strIndex]['id']}
        />
        {houses[strIndex + 1] && <SearchBoxItem
          dealType={houses[strIndex + 1]['dealType']}
          area={houses[strIndex + 1]['area']}
          district={houses[strIndex + 1]['district']}
          priceInfo={houses[strIndex + 1]['priceInfo']}
          imageUrl={houses[strIndex + 1]['image']}
          houseId={houses[strIndex + 1]['id']}
        />}
      </div>
    )
  }

  render () {
    const { houses } = this.props
    return (
      <div className="searchBoxContainer">
        {this._createSearchBoxes(houses)}
      </div>
    )
  }
}