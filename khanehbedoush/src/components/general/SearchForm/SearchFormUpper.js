import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'

export default class SearchFormUpper extends Component {
  render() {
    return (
      <div className="searchFormUpper">
        <div className="searchFormUpperItem">
          <div className="searchFormUpperItemTxt">
            {Fa["meters square"]}
          </div>
          <input className="textInput curvedCorner" type="text" placeholder={Fa["max area"]}/>
        </div>

        <div className="searchFormUpperItem">
          <div className="searchFormUpperItemTxt">
            {Fa["Touman"]}
          </div>
          <input className="textInput curvedCorner" type="text" placeholder={Fa["max price"]}/>
        </div>

        <div className="searchFormUpperItem" id="searchFormPropertyInput">
          <div className="searchFormUpperItemTxt"/>
          <select className="searchFormUpperItemSelectBox curvedCorner" id="searchFormRightMostItem"
                  name="propertyType">
            <option value="" disabled selected>{Fa["property type"]}</option>
            <option value="apartment">{Fa["apartment"]}</option>
            <option value="villa">{Fa["villa"]}</option>
            <option value="tower">{Fa["tower"]}</option>
            <option value="kolangi">{Fa["kolangi"]}</option>
          </select>
        </div>
      </div>
    )
  }
}