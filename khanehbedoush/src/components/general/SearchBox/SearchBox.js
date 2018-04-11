import React, { Component } from 'react'
import 'src/styles/SearchResultsPage/SearchBox.css'
import SearchBoxItem from './SearchBoxItem'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
  }

  _createSearchBoxes = (houses) => {
    if (!houses) {
      return []
    }

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
          district={houses[strIndex]['address']}
          basePrice={houses[strIndex]['basePrice']}
          rentPrice={houses[strIndex]['rentPrice']}
          sellingPrice={houses[strIndex]['sellingPrice']}
          imageUrl={houses[strIndex]['imageURL']}
          houseId={houses[strIndex]['id']}
        />
        {houses[strIndex + 1] && <SearchBoxItem
          dealType={houses[strIndex + 1]['dealType']}
          area={houses[strIndex + 1]['area']}
          district={houses[strIndex + 1]['address']}
          basePrice={houses[strIndex]['basePrice']}
          rentPrice={houses[strIndex]['rentPrice']}
          sellingPrice={houses[strIndex]['sellingPrice']}
          imageUrl={houses[strIndex + 1]['imageURL']}
          houseId={houses[strIndex + 1]['id']}
        />}
      </div>
    )
  }

  render () {
    const {houses} = this.props

    return (
      <div className="searchBoxContainer">
        {!houses && <h1>Loading</h1>}
        {houses && this._createSearchBoxes(houses)}
      </div>
    )
  }
}