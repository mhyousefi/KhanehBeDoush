import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SearchFormUpper from './SearchFormUpper'
import SearchFormLower from './SearchFormLower'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'


export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToSearchResults: false,
      maxPrice: '',
      minArea: '',
      propertyType: '',
      dealType: '',
    };
  }

  _createUrl = (maxPrice, minArea, propertyType, dealType) => {
    return '/SearchResults/' + maxPrice + '/' + minArea + '/' + propertyType + '/' + dealType
  }

  _createFormStyle = () => {
    if (this.props.isHomePage === true) {
      return "searchFormContainer curvedCorner homePageSearchForm"
    } else {
      return "searchFormContainer curvedCorner searchResultsSearchForm"
    }
  }

  _handleMaxPriceChange = (newMaxPrice) => {
    this.setState({maxPrice: newMaxPrice})
    // console.log("NEW MAX PRICE ====> " + newMaxPrice)
  }

  _handleMinAreaChange = (newMinArea) => {
    this.setState({minArea: newMinArea})
    // console.log("NEW MIN AREA ====> " + newMinArea)
  }

  _handlePropertyTypeChange = (newPropertyType) => {
    this.setState({propertyType: newPropertyType})
    // console.log("NEW PROPERTY TYPE ====> " + newPropertyType)
  }

  _handleDealTypeChange = (newDealType) => {
    this.setState({dealType: newDealType})
    // console.log("NEW DEAL TYPE ====> " + newDealType)
  }

  _handleSearchClick = () => {
    // TODO: search params exception handling + show a modal (and not enable redirect) in case of an error
    this.setState({redirectToSearchResults: true})
  }

  render() {
    const { maxPrice, minArea, propertyType, dealType } = this.state

    if (this.state.redirectToSearchResults) {
      return <Redirect to={this._createUrl(maxPrice, minArea, propertyType, dealType)}/>
    }

    return (
      <form action="" className={this._createFormStyle()}>
        <SearchFormUpper
          onMaxPriceChange={this._handleMaxPriceChange}
          onMinAreaChange={this._handleMinAreaChange}
          onPropertyTypeChange={this._handlePropertyTypeChange}
        />
        <SearchFormLower
          onDealTypeChange={this._handleDealTypeChange}
          onSearchClick={this._handleSearchClick}
        />
      </form>
    )
  }
}