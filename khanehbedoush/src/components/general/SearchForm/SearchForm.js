import React, { Component } from 'react'
import SearchFormUpper from './SearchFormUpper'
import SearchFormLower from './SearchFormLower'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'


export default class SearchForm extends Component {
  render() {
    return (
      <form action="" className="searchFormContainer curvedCorner homePageSearchFormBackground">
        <SearchFormUpper/>
        <SearchFormLower/>
      </form>
    )
  }
}