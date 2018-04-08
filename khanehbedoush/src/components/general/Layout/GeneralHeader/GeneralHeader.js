import React, { Component } from 'react'
import HeaderImageBar from './HeaderImageBar'
import HeaderUpperRow from './HeaderUpperRow'
import 'src/styles/Header/Header.css'
import 'src/styles/General.css'

export default class GeneralHeader extends Component {
  render() {
    const { pageTitle, credit } = this.props
    return (
      <header className="addCreditHeaderContainer defaultHeaderHeight rtl">
        <HeaderUpperRow credit={credit}/>
        <HeaderImageBar pageTitle={pageTitle}/>
      </header>
    )
  }
}