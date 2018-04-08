import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Footer from 'src/components/general/Layout/Footer'
import GeneralHeader from 'src/components/general/Layout/GeneralHeader/GeneralHeader'
import HomePageHeader from 'src/components/general/Layout/HomePageHeader/HomePageHeader'
import config from 'src/constants/appConfig'
import 'src/styles/Background.css'
import 'src/styles/General.css'
import 'src/styles/PageContainers.css'


export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customerCredit: config["initial credit"]
    };
    this._handleCreditChange = this._handleCreditChange.bind(this)
  }

  _handleCreditChange = (amount) => {
    if (!isNaN(amount)) {
      const newCredit = parseInt(this.state.customerCredit) + parseInt(amount)
      this.setState({customerCredit: newCredit})
    }
  }

  _chooseHeader = (pageTitle) => {
    const {customerCredit} = this.state
    if (this.props.isHomePage) {
      return <HomePageHeader credit={customerCredit}/>
    } else {
      return <GeneralHeader pageTitle={pageTitle} credit={customerCredit}/>
    }
  }

  _chooseBody = () => {
    const { children } = this.props;
    let childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onCreditChange: this._handleCreditChange }));

    if (this.props.isHomePage) {
      return (
        <div className="homePageContainer">
          {childrenWithProps}
        </div>
      )
    } else {
      return (
        <div className="defaultPageContainer">
          {childrenWithProps}
        </div>
      )
    }
  }

  render () {
    const { pageTitle } = this.props
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