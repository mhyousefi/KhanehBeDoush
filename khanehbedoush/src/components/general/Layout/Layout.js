import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Footer from 'src/components/general/Layout/Footer'
import GeneralHeader from 'src/components/general/Layout/GeneralHeader/GeneralHeader'
import HomePageHeader from 'src/components/general/Layout/HomePageHeader/HomePageHeader'
import 'src/styles/Background.css'
import 'src/styles/General.css'
import 'src/styles/PageContainers.css'


export default class Layout extends Component {
  _chooseHeader = (pageTitle) => {
    const { isHomePage, user, onCreditChange, onLogin, onLoginModalOpen } = this.props
    if (isHomePage) {
      return (
        <HomePageHeader
          user={user}
          onCreditChange={onCreditChange}
          onLoginModalOpen={onLoginModalOpen}
          onLogin={onLogin}
        />
      )
    } else {
      return (
        <GeneralHeader
          pageTitle={pageTitle}
        />
      )
    }
  }

  _chooseBody = () => {
    const {isHomePage} = this.props
    if (isHomePage) {
      return (
        <div className="homePageContainer">
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div className="defaultPageContainer">
          {this.props.children}
        </div>
      )
    }
  }

  render () {
    const {pageTitle} = this.props
    return (
      <div className="body rtl">
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet"/>
          <link rel='stylesheet' id='fontawesome-css'
                href='https://use.fontawesome.com/releases/v5.0.1/css/all.css?ver=4.9.1'
                type='text/css' media='all'/>
          <title>{pageTitle}</title>
        </Helmet>
        {this._chooseHeader(pageTitle)}
        {this._chooseBody()}
        <Footer/>
      </div>
    )
  }
}