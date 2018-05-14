import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Fa from 'src/constants/Fa'
import { messages } from 'src/constants/FaTexts'
import 'src/styles/Header/Header.css'
import 'src/styles/UserInfoCard/UserInfoCard.css'
import { Button } from 'material-ui'


export default class ProfileAreaDropDown extends Component {
  state = {
    redirectToAddCredit: false
  }

  _handleAddCreditButtonClick = () => {
    this.setState({ redirectToAddCredit: true });
  }

  _handleSignOutBtnClick = () => {
    this.props.onLogout()
  }

  _handleLoginBtnClick = () => {
    this.props.onLoginModalOpen()
  }

  render() {
    const { user } = this.props

    if (this.state.redirectToAddCredit) {
      return <Redirect to='/AddCredit'/>
    }

    if (!user) {
      return (
        <div className="profileAreaDropDownContent curvedCorner" id={this.props.isHomePage ? "homePageProfileArea" : ""}>
          {messages["not logged in"]}
          <Button color="secondary" onClick={this._handleLoginBtnClick}>
            {Fa["sign into account"]}
          </Button>
        </div>
      )
    }

    return (
      <div className="profileAreaDropDownContent curvedCorner" id={this.props.isHomePage ? "homePageProfileArea" : ""}>
        <div className="text userInfoCardUpperRow userInfoCardCommonRowProps">
          {user.name}
        </div>
        <div className="userInfoCardMiddleRow userInfoCardCommonRowProps">
          <div className="text">{Fa['credit']}</div>
          <div className="text">{user.credit + " " + Fa['Touman']}</div>
        </div>
        <div className="userInfoCardLowerRow center">
          <Button color="primary" className="userInfoCardBtn text curvedCorner" onClick={this._handleAddCreditButtonClick}>
            {Fa['increase credit']}
          </Button>
          <Button color='secondary' onClick={this._handleSignOutBtnClick}>
            {Fa['sign out']}
          </Button>
        </div>
      </div>
    )
  }
}