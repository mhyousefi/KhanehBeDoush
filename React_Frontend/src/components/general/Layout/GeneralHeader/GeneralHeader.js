import React, { Component } from 'react'
import HeaderImageBar from './HeaderImageBar'
import HeaderUpperRow from './HeaderUpperRow'
import 'src/styles/Header/Header.css'
import 'src/styles/General.css'

export default class GeneralHeader extends Component {
  render() {
    const { pageTitle, user, onLoginModalOpen, onLogout } = this.props
    return (
      <header className="addCreditHeaderContainer defaultHeaderHeight rtl">
        <HeaderUpperRow user={user} onLoginModalOpen={onLoginModalOpen} onLogout={onLogout} />
        <HeaderImageBar pageTitle={pageTitle}/>
      </header>
    )
  }
}