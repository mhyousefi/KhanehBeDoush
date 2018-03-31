import React, { Component } from 'react'
import Fa from '../../../../constants/Fa'
import '../../../../styles/Header/Header.css'
import '../../../../styles/UserInfoCard/UserInfoCard.css'


export default class ProfileAreaDropDown extends Component {
  render() {
    return (
      <div className="profileAreaDropDownContent curvedCorner">
        <div className="text userInfoCardUpperRow userInfoCardCommonRowProps">
          {Fa['Behnam Homayoun']}
        </div>
        <div className="userInfoCardMiddleRow userInfoCardCommonRowProps">
          <div className="text">{Fa['credit']}</div>
          <div className="text">{Fa['2000 Toumans']}</div>
        </div>
        <div className="userInfoCardLowerRow">
          <button className="userInfoCardBtn text curvedCorner">
            {Fa['increase credit']}
          </button>
        </div>
      </div>
    )
  }
}