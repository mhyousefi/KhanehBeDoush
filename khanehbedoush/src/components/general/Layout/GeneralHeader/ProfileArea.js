import React, { Component } from 'react'
import ProfileAreaDropDown from './ProfileAreaDropDown'
import Fa from 'src/constants/Fa'
import 'src/styles/Header/Header.css'
import 'src/styles/UserInfoCard/UserInfoCard.css'


export default class ProfileArea extends Component {
  render() {
    const { onLoginModalOpen, credit } = this.props
    return (
      <div className="headerProfileArea">
        <div className="profileAreaDropDown">
          <i className="far fa-smile homePageSmileyFaceIcon magentaColor"/>
          <div className="headerProfileAreaTxt">
            {Fa['profile area']}
          </div>
        </div>
        <ProfileAreaDropDown
          isHomePage={false}
          credit={credit}
          onLoginModalOpen={onLoginModalOpen}
        />
      </div>
    )
  }
}