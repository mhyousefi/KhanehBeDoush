import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import 'src/styles/Background.css'
import 'src/styles/General.css'
import 'src/styles/PageContainers.css'
import Footer from './Footer'
import GeneralHeader from './Header/GeneralHeader'
import HomePageHeader from './HomePageHeader/HomePageHeader'

export default class Layout extends Component {
  render () {
    const { isHomePage } = this.props
    return (
      <div className="body rtl">
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet"/>
          <link rel='stylesheet' id='fontawesome-css'
                href='https://use.fontawesome.com/releases/v5.0.1/css/all.css?ver=4.9.1'
                type='text/css' media='all'/>
        </Helmet>
        {isHomePage && <HomePageHeader/>}
        {!isHomePage && <GeneralHeader/>}
        <div className="defaultPageContainer">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}