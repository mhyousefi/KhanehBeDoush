import React, { Component } from 'react'
import '../../../../styles/Header/Header.css'
import '../../../../styles/General.css'


import HeaderImageBar from './HeaderImageBar'
import HeaderUpperRow from './HeaderUpperRow'

export default class GeneralHeader extends Component {
  render() {
    return (
      <header className="addCreditHeaderContainer defaultHeaderHeight rtl">
        <HeaderUpperRow/>
        <HeaderImageBar/>
      </header>
    )
  }
}