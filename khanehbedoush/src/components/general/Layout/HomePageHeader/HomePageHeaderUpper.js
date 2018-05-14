import React, { Component } from 'react'
import ProfileAreaDropDown from "src/components/general/Layout/GeneralHeader/ProfileAreaDropDown"
import Fa from 'src/constants/Fa'
import 'src/styles/Header/Header.css'
import 'src/styles/HomePage/HomePageHeader.css'
import 'src/styles/HomePage/HomePageResponsive.css'

export default class HomePageHeaderUpper extends Component {
  render () {
    const { user, onLoginModalOpen, onLogout } = this.props
    return (
      <div className="homePageHeaderUpper">
        <div className="headerProfileArea">
          <div className="profileAreaDropDown homePageProfileArea curvedCorner">
            <i className="far fa-smile homePageSmileyFaceIcon whiteTxt"/>
            <div className="headerProfileAreaTxt whiteTxt">
              {Fa["profile area"]}
            </div>
          </div>
          <ProfileAreaDropDown
            isHomePage={true}
            user={user}
            onLoginModalOpen={onLoginModalOpen}
            onLogout={onLogout}
          />
        </div>
      </div>
    )
  }
}