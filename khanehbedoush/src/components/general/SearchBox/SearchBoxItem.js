import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Fa from 'src/constants/Fa'
import 'src/styles/SearchResultsPage/SearchBox.css'
import 'src/styles/General.css'
import 'src/styles/text.css'
import { toPersian } from 'src/utilities/formats'


export default class SearchBoxItem extends Component {
  _createPriceRow = () => {
    const {dealType, basePrice, rentPrice, sellingPrice} = this.props
    if (dealType === 'rental') {
      return (
        <div className="searchBoxPriceRow">
          <div className="searchBoxBasePrice text">
            {Fa["Rahn"] + " " + toPersian(basePrice)}
            <div className="searchBoxTouman">
              {Fa["Touman"]}
            </div>
          </div>
          <div className="searchBoxRentPrice text">
            {Fa["rent"] + " " + toPersian(rentPrice)}
            <div className="searchBoxTouman">
              {Fa["Touman"]}
            </div>
          </div>
        </div>
      )
    } else if (dealType === 'sale') {
      return (
        <div className="searchBoxPriceRow">
          <div className="searchBoxSalePrice text">
            {Fa["price"] + " " + toPersian(sellingPrice)}
            <div className="searchBoxTouman">
              {Fa["Touman"]}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="searchBoxPriceRow">
          {Fa["price not available"]}
        </div>
      )
    }
  }

  _createTag = () => {
    if (this.props.dealType === "rental") {
      return (
        <div className="searchBoxTagCommon searchBoxRentTagCostum curvedCorner">
          {Fa["Rahn and rent"]}
        </div>
      )
    } else {
      return (
        <div className="searchBoxTagCommon searchBoxSaleTagCostum curvedCorner">
          {Fa["sell"]}
        </div>
      )
    }
  }

  _createLocationIcon = () => {
    if (this.props.dealType === "rental") {
      return <i className="material-icons iconSize searchBoxRentIconColor">place</i>
    } else {
      return <i className="material-icons iconSize searchBoxSaleIconColor">place</i>
    }
  }

  render() {
    const {district, area, imageUrl, houseId} = this.props
    return (
      <Link to={"/HomeDetail/" + houseId} className="searchBox curvedCorner noUnderLine">
        <div className="searchBoxImg curvedCorner" style={{backgroundImage: "url(" + imageUrl + ")"}}>
          {this._createTag()}
        </div>
        <div className="searchBoxLower">
          <div className="searchBoxAreaLocationRow">
            <div className="searchBoxAreaTxt text">
              {toPersian(area)} {Fa["meters square"]}
            </div>
            <div className="searchBoxLocation">
              {this._createLocationIcon()}
              <div className="searchBoxLocationTxt text">{district}</div>
            </div>
          </div>
          <div className="separatingLine"/>
          {this._createPriceRow()}
        </div>
      </Link>
    )
  }
}