import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Fa from 'src/constants/Fa'
import 'src/styles/Header/Header.css'
import 'src/styles/UserInfoCard/UserInfoCard.css'


export default class ProfileAreaDropDown extends Component {
  state = {
    redirectToAddCredit: false
  }

  _handleButtonClick = () => {
    this.setState({ redirectToAddCredit: true });
  }

  render() {
    if (this.state.redirectToAddCredit) {
      return <Redirect to='/AddCredit'/>
    }

    return (
      <div className="profileAreaDropDownContent curvedCorner" id={this.props.isHomePage ? "homePageProfileArea" : ""}>
        <div className="text userInfoCardUpperRow userInfoCardCommonRowProps">
          {Fa['Behnam Homayoun']}
        </div>
        <div className="userInfoCardMiddleRow userInfoCardCommonRowProps">
          <div className="text">{Fa['credit']}</div>
          <div className="text">{Fa['2000 Toumans']}</div>
        </div>
        <div className="userInfoCardLowerRow">
          <button className="userInfoCardBtn text curvedCorner" onClick={() => {this._handleButtonClick()}}>
            {Fa['increase credit']}
          </button>
        </div>
      </div>
    )
  }
}