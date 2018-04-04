import React, { Component } from 'react'
import SearchForm from 'src/components/general/SearchForm/SearchForm'
import SearchFormBottomSlogan from 'src/components/general/SearchForm/SearchFormBottomSlogan'


export default class HomePageHeaderLower extends Component {
  render () {
    return (
      <div className="homePageHeaderLower">
        <SearchForm/>
        <SearchFormBottomSlogan/>
      </div>
    )
  }
}