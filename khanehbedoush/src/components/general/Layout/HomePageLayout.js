import React, { Component } from 'react'
import Footer from './Footer'
import HomePageHeader from './HomePageHeader/HomePageHeader'
import 'src/styles/General.css'
import 'src/styles/Background.css'
import 'src/styles/PageContainers.css'

export default class HomePageLayout extends Component {
  render () {
    return (
      <div dir="rtl">
        <HomePageHeader/>
        <div className="homePageContainer">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}