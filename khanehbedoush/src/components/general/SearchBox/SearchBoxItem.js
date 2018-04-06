import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/SearchResultsPage/SearchBox.css'
import 'src/styles/General.css'
import 'src/styles/text.css'



export default class SearchBoxItem extends Component {
  _createPriceRow = (priceInfo) => {
    if (this.props.dealType === "rental") {
      return (
        <div className="searchBoxPriceRow">
          <div className="searchBoxBasePrice text">
            {Fa["Rahn"]} {priceInfo["basePrice"]} &nbsp;
            <div className="searchBoxTouman">تومان</div>
          </div>
          <div className="searchBoxRentPrice text">
            {Fa["rent"]} {priceInfo["rentPrice"]} &nbsp;
            <div className="searchBoxTouman">تومان</div>
          </div>
        </div>
      )
    } else if (this.props.dealType === "sell") {
      return (
        <div className="searchBoxPriceRow">
          <div className="searchBoxSalePrice text">
            {Fa["price"]} {priceInfo["sellingPrice"]} &nbsp;
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

  render() {
    const {dealType, district, area, priceInfo} = this.props
    return (
      <div className="searchBox curvedCorner">
        <div className="searchBoxImg curvedCorner">
          <div className="searchBoxTagCommon searchBoxSaleTagCostum curvedCorner">
            {(dealType === 'sell') ? Fa["sell"] : Fa["Rahn and rent"]}
          </div>
        </div>
        <div className="searchBoxLower">
          <div className="searchBoxAreaLocationRow">
            <div className="searchBoxAreaTxt text">
              {area} &nbsp {Fa["meters square"]}
            </div>
            <div className="searchBoxLocation">
              {/*<i className="material-icons iconSize searchBoxSaleIconColor">place</i>*/}
              <div className="searchBoxLocationTxt text">{district}</div>
            </div>
          </div>
          <div className="separatingLine"/>
          {this._createPriceRow(priceInfo)}
        </div>
      </div>
    )
  }
}