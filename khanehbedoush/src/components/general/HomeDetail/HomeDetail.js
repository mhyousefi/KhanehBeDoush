import React, { Component } from 'react'
import HomeDetailInfo from './HomeDetailInfo'
import { homeDetailMessages as messages } from 'src/constants/FaTexts'
import { payForPhoneNum } from 'src/api/PhoneNumPurchase'
import 'src/styles/General.css'
import 'src/styles/HomeDetail/HomeDetail.css'

export default class HomeDetail extends Component {
  state = {
    phoneNumVisible: false,
  }

  _handleButtonClick = () => {
    const phoneNumber = this.props.house["phoneNumber"]
    if (payForPhoneNum(phoneNumber) === false) {
      alert(messages["insufficient credit"])
    } else {
      this.setState({phoneNumVisible: true})
    }
  }

  render () {
    const { house } = this.props
    console.log("this.state.phoneNumVisible ==========> " + this.state.phoneNumVisible)
    return (
      <div className="homeDetailContainer">
        <HomeDetailInfo house={house} phoneNumVisible={this.state.phoneNumVisible}/>
        <div className="homeDetailLeft">
          <img className="homeDetailPhoto curvedCorner" src={house['image']} alt={house['phoneNumber']}/>
          {(this.state.phoneNumVisible === false) &&
            <input
              className="phoneNumStatus curvedCorner handCursor"
              type="button"
              value={messages["show phone number"]}
              onClick={this._handleButtonClick}
            />}
        </div>
      </div>
    )
  }
}