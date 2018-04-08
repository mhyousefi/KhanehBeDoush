import React, { Component } from 'react'
import HomeDetailInfo from './HomeDetailInfo'
import { messages } from 'src/constants/FaTexts'
import { payForPhoneNum } from 'src/api/PhoneNumPurchase'
import 'src/styles/General.css'
import 'src/styles/HomeDetail/HomeDetail.css'

export default class HomeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumVisible: this.props.hasPaid
    }
  }

  _handleButtonClick = () => {
    const {house, hasPaid} = this.props
    const phoneNumber = house["phoneNumber"]
    if (!hasPaid) {
      if (payForPhoneNum(phoneNumber) === false) {
        alert(messages["insufficient credit"])
      } else {
        this.setState({phoneNumVisible: true})
      }
    }
  }

  render () {
    const { house } = this.props
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