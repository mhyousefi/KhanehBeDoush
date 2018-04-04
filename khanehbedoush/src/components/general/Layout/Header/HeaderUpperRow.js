import React, { Component } from 'react'
import ProfileArea from './ProfileArea'
import Fa from 'src/constants/Fa'
import 'src/styles/Header/Header.css'
import 'src/styles/UserInfoCard/UserInfoCard.css'

import LogoImg from 'src/assets/images/logo.png'

export default class HeaderUpperRow extends Component {
  render() {
    return (
      <div className="headerUpperRowContainer">
        <div className="headerUpperRow">
          <img className="headerLogo" src={LogoImg}/>
          <div className="headerPageTitleTxt">
            {Fa['KhanehBeDoush']}
          </div>
          <ProfileArea/>
        </div>
      </div>
    )
  }
}