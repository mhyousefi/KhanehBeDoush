import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'


export default class SearchFormLower extends Component {
  state = {
    redirectToSearchResults: false
  }

  _handleButtonClick = () => {
    this.setState({ redirectToSearchResults: true })
  }

  render() {
    if (this.state.redirectToSearchResults) {
      return <Redirect to="/SearchResults"/>
    }

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

        <button className="searchFormBtn curvedCorner searchFormBtnTxt" onClick={this._handleButtonClick}>
          {Fa["search"]}
        </button>
      </div>
    )
  }
}