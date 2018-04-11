import React, { Component } from 'react'
import HomeDetailInfo from './HomeDetailInfo'
import { messages } from 'src/constants/FaTexts'
import { payForPhoneNumAPI } from 'src/api/PhoneNumPurchase'
import { config } from 'src/constants/constants'
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
    const {hasPaid, onCreditChange, houseId, credit} = this.props
    if (!hasPaid) {
      if (parseInt(credit) < 1000) {
        alert(messages['insufficient credit'])
      } else {
        payForPhoneNumAPI(houseId).then((response) => {
          if (response === false) {
            alert(messages["server error"])
          } else {
            this.setState({phoneNumVisible: true})
            onCreditChange("-" + config["home price"])
          }
        })
      }
    }
  }

  render () {
    const { house, hasPaid } = this.props

    if (!hasPaid) {
      return <h1>Loading</h1>
    }

    return (
      <div className="homeDetailContainer">
        <HomeDetailInfo house={house} phoneNumVisible={this.state.phoneNumVisible}/>
        <div className="homeDetailLeft">
          <img className="homeDetailPhoto curvedCorner" src={house['imageUrl']} alt={house['phoneNumber']}/>
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