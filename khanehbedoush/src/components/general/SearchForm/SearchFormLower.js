import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'

export default class SearchFormLower extends Component {
  render() {
    return (
      <div className="searchFormLower">
        <div className="searchFormRadioContainer">
          <div className="searchFormRadioBtn">
            <input className="radioButton" type="radio" name="propertyType" value="رهن و اجاره"/>
            {Fa["rental"]}
          </div>
          <div className="searchFormRadioBtn">
            <input className="radioButton" type="radio" name="propertyType" value="خرید"/>
            {Fa["purchase"]}
          </div>
        </div>

        <button className="searchFormBtn curvedCorner searchFormBtnTxt">
          {Fa["search"]}
        </button>
      </div>
    )
  }
}