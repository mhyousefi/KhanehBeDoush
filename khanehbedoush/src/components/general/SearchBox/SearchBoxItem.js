import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Fa from 'src/constants/Fa'
import 'src/styles/SearchResultsPage/SearchBox.css'
import 'src/styles/General.css'
import 'src/styles/text.css'
import { isRental, isForSale, toPersian } from 'src/utilities/formats'
import { messages } from '../../../constants/FaTexts'


export default class SearchBoxItem extends Component {
  _createPriceRow = () => {
    const {dealType, basePrice, rentPrice, sellingPrice} = this.props
    if (isRental(dealType)) {
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
    } else if (isForSale(dealType)) {
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
          {messages["price not available"]}
        </div>
      )
    }
  }

  _createTag = () => {
    const { dealType } = this.props

    if (isRental(dealType)) {
      return (
        <div className="searchBoxTagCommon searchBoxRentTagCostum curvedCorner">
          {Fa["Rahn and rent"]}
        </div>
      )
    } else if (isForSale(dealType)) {
      return (
        <div className="searchBoxTagCommon searchBoxSaleTagCostum curvedCorner">
          {Fa["sell"]}
        </div>
      )
    } else {
      return <div/>
    }
  }

  _createLocationIcon = () => {
    const { dealType } = this.props
    if (isRental(dealType)) {
      return <i className="material-icons iconSize searchBoxRentIconColor">place</i>
    } else if (isForSale(dealType)) {
      return <i className="material-icons iconSize searchBoxSaleIconColor">place</i>
    } else {
      return <div/>
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