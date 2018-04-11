import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'


export default class SearchFormBottomSlogan extends Component {
  render() {
    return (
      <div className="searchFormBottomPart transparentColor curvedCorner">
        <div className="searchFormBottomPartTxt">
          {Fa["SearchFormSlogan"]}
        </div>
      </div>
    )
  }
}