import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LogoImg from 'src/assets/images/logo.png'
import Fa from 'src/constants/Fa'
import 'src/styles/General.css'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'

export default class HomePageHeaderMiddle extends Component {
  render () {
    return (
      <Link to='/' className="homePageHeaderMiddle noUnderLine">
        <img className="homePageLogo" src={LogoImg} alt="KhanehBeDoushTwitter"/>
        <div className="homePageTitle">
          {Fa['KhanehBeDoush']}
        </div>
      </Link>
    )
  }
}