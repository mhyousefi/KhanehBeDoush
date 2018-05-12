import React, { Component } from 'react'
import HomeDetailInfo from './HomeDetailInfo'
import { messages } from 'src/constants/FaTexts'
import { payForPhoneNumAPI } from 'src/api/PhoneNumPurchase'
import { config } from 'src/constants/constants'
import { CircularProgress, MuiThemeProvider } from 'material-ui'
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
    const { hasPaid, onCreditChange, houseId, user, onLoginModalOpen } = this.props
    if (!user) {
      onLoginModalOpen()
    } else if (!hasPaid) {
      if (parseInt(user.credit) < 1000) {
        alert(messages['insufficient credit'])
      } else {
        payForPhoneNumAPI(houseId, user.token).then((response) => {
          if (response['exists'] === false) {
            alert(messages['non-existing house'])
          } else {
            if (response['status'] === false) {
              alert(messages["insufficient credit"])
            } else {
              this.setState({phoneNumVisible: true})
              onCreditChange("-" + config["home price"])
            }
          }
        })
      }
    }
  }

  render () {
    const { house, hasPaid } = this.props
    let hidePurchaseBtn = (hasPaid || this.state.phoneNumVisible)

    if (!house) {
      return (
        <MuiThemeProvider>
          <h2>{messages['loading']}</h2>
          <br/>
          <CircularProgress size={100} thickness={7} style={{ color: 'purple' }} />
        </MuiThemeProvider>
      )
    }

    return (
      <div className="homeDetailContainer">
        <HomeDetailInfo house={house} phoneNumVisible={hasPaid || this.state.phoneNumVisible}/>
        <div className="homeDetailLeft">
          <img className="homeDetailPhoto curvedCorner" src={house['imageUrl']} alt={house['phoneNumber']}/>
          {!hidePurchaseBtn &&
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