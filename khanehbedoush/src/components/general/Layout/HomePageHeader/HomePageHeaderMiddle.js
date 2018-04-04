import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'

import LogoImg from 'src/assets/images/logo.png'

export default class HomePageHeaderMiddle extends Component {
  render () {
    return (
      <div className="homePageHeaderMiddle">
        <img className="homePageLogo" src={LogoImg} alt="KhanehBeDoushTwitter"/>
        <div className="homePageTitle">
          {Fa['KhanehBeDoush']}
        </div>
      </div>
    )
  }
}