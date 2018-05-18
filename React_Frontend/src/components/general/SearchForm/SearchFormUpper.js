import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'
import 'src/styles/SearchForm/SearchForm.css'
import 'src/styles/SearchForm/SearchFormMediaQuery.css'

export default class SearchFormUpper extends Component {
  constructor(props) {
    super(props)
    this._handleMinAreaChange = this._handleMinAreaChange.bind(this)
    this._handleMaxPriceChange = this._handleMaxPriceChange.bind(this)
    this._handlePropertyTypeChange = this._handlePropertyTypeChange.bind(this)
  }

  _handleMinAreaChange(event) {
    this.props.onMinAreaChange(event.target.value)
  }

  _handleMaxPriceChange(event) {
    this.props.onMaxPriceChange(event.target.value)
  }

  _handlePropertyTypeChange(event) {
    this.props.onPropertyTypeChange(event.target.value)
  }

  render() {
    return (
      <div className="searchFormUpper">
        <div className="searchFormUpperItem">
          <div className="searchFormUpperItemTxt">
            {Fa["meters square"]}
          </div>
          <input
            className="textInput curvedCorner"
            type="text"
            placeholder={Fa["min area"]}
            onChange={this._handleMinAreaChange}/>
        </div>

        <div className="searchFormUpperItem">
          <div className="searchFormUpperItemTxt">
            {Fa["Touman"]}
          </div>
          <input
            className="textInput curvedCorner"
            type="text"
            placeholder={Fa["max price"]}
            onChange={this._handleMaxPriceChange}
          />
        </div>

        <div className="searchFormUpperItem" id="searchFormPropertyInput">
          <div className="searchFormUpperItemTxt"/>
          <select className="searchFormUpperItemSelectBox curvedCorner"
                  id="searchFormRightMostItem"
                  name="propertyType"
                  onChange={this._handlePropertyTypeChange}
          >
            <option value="" disabled selected>{Fa["property type"]}</option>
            <option value={Fa["apartment"]}>{Fa["apartment"]}</option>
            <option value={Fa["villa"]}>{Fa["villa"]}</option>
          </select>
        </div>
      </div>
    )
  }
}