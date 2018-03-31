import React, { Component } from 'react'
import Fa from '../../../../constants/Fa'
import '../../../../styles/Header/Header.css'
import '../../../../styles/UserInfoCard/UserInfoCard.css'

import LogoImg from '../../../../assets/images/logo.png'
import ProfileArea from './ProfileArea'

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