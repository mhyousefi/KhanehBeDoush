import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LogoImg from 'src/assets/images/logo.png'
import Fa from 'src/constants/Fa'
import 'src/styles/General.css'
import 'src/styles/Header/Header.css'
import 'src/styles/UserInfoCard/UserInfoCard.css'
import ProfileArea from './ProfileArea'
import AddHomeBtn from '../../AddHome/AddHomeBtn'

export default class HeaderUpperRow extends Component {
  render () {
    const { onLoginModalOpen, user, onLogout } = this.props
    return (
      <div className="headerUpperRowContainer">
        <div className="headerUpperRow">
          <img className="headerLogo" src={LogoImg}/>
          <Link to='/' className="headerPageTitleTxt noUnderLine">
            {Fa['KhanehBeDoush']}
          </Link>
          <AddHomeBtn/>
          <ProfileArea user={user} onLoginModalOpen={onLoginModalOpen} onLogout={onLogout} />
        </div>
      </div>
    )
  }
}