import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'


export default class SearchFormLower extends Component {
  constructor(props) {
    super(props)
    this._handleRentalRadioClick = this._handleRentalRadioClick.bind(this)
    this._handleForSaleRadioClick = this._handleForSaleRadioClick.bind(this)
  }

  _handleRentalRadioClick(event) {
    this.props.onDealTypeChange(event.target.value)
  }

  _handleForSaleRadioClick(event) {
    this.props.onDealTypeChange(event.target.value)
  }

  render() {
    const {onSearchClick} = this.props
    return (
      <div className="searchFormLower">
        <div className="searchFormRadioContainer">
          <div className="searchFormRadioBtn">
            <input
              className="radioButton"
              type="radio"
              name="propertyType"
              value={Fa["rental"]}
              onClick={this._handleRentalRadioClick}
            />
            {Fa["rental"]}
          </div>
          <div className="searchFormRadioBtn">
            <input
              className="radioButton"
              type="radio"
              name="propertyType"
              value={Fa["purchase"]}
              onClick={this._handleForSaleRadioClick}
            />
            {Fa["purchase"]}
          </div>
        </div>

        <button className="searchFormBtn curvedCorner searchFormBtnTxt" onClick={onSearchClick}>
          {Fa["search"]}
        </button>
      </div>
    )
  }
}