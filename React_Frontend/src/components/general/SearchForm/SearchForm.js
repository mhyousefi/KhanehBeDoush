import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { searchParamsAreValid, toEnglish } from 'src/utilities/formats'
import { messages } from 'src/constants/FaTexts'
import SearchFormUpper from './SearchFormUpper'
import SearchFormLower from './SearchFormLower'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'
import Fa from 'src/constants/Fa'


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

  _createDealType = (input) => {
    if (input === '') {
      return 'none'
    }

    if (input === Fa['purchase']) {
      return 'sale'
    }

    if (input === Fa['rent'] || input === Fa["Rahn and rent"]) {
      return 'rental'
    }
  }

  _createPropertyType = (input) => {
    if (input === Fa["apartment"]) {
      return 'apartment'
    } else if (input === Fa["villa"]) {
      return 'villa'
    } else {
      return 'none'
    }
  }

  _createUrl = (maxPrice, minArea, propertyType, dealType) => {
    return  '/SearchResults' +
            '/' + (maxPrice || 'none') +
            '/' + (minArea || 'none') +
            '/' + (this._createPropertyType(propertyType) || 'none') +
            '/' + (this._createDealType(dealType))
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
  }

  _handleMinAreaChange = (newMinArea) => {
    this.setState({minArea: newMinArea})
  }

  _handlePropertyTypeChange = (newPropertyType) => {
    this.setState({propertyType: newPropertyType})
  }

  _handleDealTypeChange = (newDealType) => {
    this.setState({dealType: newDealType})
  }

  _handleSearchClick = (event) => {
    event.preventDefault()
    const { maxPrice, minArea, propertyType, dealType } = this.state
    if (searchParamsAreValid(maxPrice, minArea, propertyType, dealType)) {
      this.setState({redirectToSearchResults: true})
    } else {
      alert(messages['invalid search params'])
    }
  }

  render() {
    const { maxPrice, minArea, propertyType, dealType } = this.state

    if (this.state.redirectToSearchResults) {
      return <Redirect to={this._createUrl(toEnglish(maxPrice), toEnglish(minArea), propertyType, dealType)}/>
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