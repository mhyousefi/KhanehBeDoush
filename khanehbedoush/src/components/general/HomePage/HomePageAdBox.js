import React, { Component } from 'react'
import { AdBoxes } from 'src/constants/FaTexts'
import AdBox from './AdBox'
import 'src/styles/HomePage/HomePageAdBox.css'
import 'src/styles/HomePage/HomePageResponsive.css'


export default class HomePageAdBox extends Component {
  render () {
    return (
      <div className="homePageAdBoxContainer">
        {AdBoxes.map(_AddBox => (
          <AdBox image={_AddBox['image']} title={_AddBox['title']} text={_AddBox['text']}/>
        ))}
      </div>
    )
  }
}