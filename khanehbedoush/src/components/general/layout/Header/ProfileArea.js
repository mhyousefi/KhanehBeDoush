import React, { Component } from 'react'
import Fa from '../../../../constants/Fa'
import '../../../../styles/Header/Header.css'
import '../../../../styles/UserInfoCard/UserInfoCard.css'
import ProfileAreaDropDown from './ProfileAreaDropDown'

// TODO: Find the right way to do icons...
export default class ProfileArea extends Component {
  render() {
    return (
      <div className="headerProfileArea">
        <div className="profileAreaDropDown">
          <i className="far fa-smile homePageSmileyFaceIcon magentaColor"/>
          <div className="headerProfileAreaTxt">
            {Fa['profile area']}
          </div>
        </div>
        <ProfileAreaDropDown/>
      </div>
    )
  }
}