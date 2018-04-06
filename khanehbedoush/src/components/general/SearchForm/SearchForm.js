import React, { Component } from 'react'
import SearchFormUpper from './SearchFormUpper'
import SearchFormLower from './SearchFormLower'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'


export default class SearchForm extends Component {
  _createFormStyle = () => {
    if (this.props.isHomePage === true) {
      return "searchFormContainer curvedCorner homePageSearchForm"
    } else {
      return "searchFormContainer curvedCorner searchResultsSearchForm"
    }
  }
  render() {
    return (
      <form action="" className={this._createFormStyle()}>
        <SearchFormUpper/>
        <SearchFormLower/>
      </form>
    )
  }
}