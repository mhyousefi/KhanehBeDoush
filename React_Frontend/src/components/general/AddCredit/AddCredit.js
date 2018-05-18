import React, { Component } from 'react'
import { messages } from 'src/constants/FaTexts'
import { changeCreditAPI } from 'src/api/BankApi'
import Fa from 'src/constants/Fa'
import 'src/styles/AddCreditPage/AddCreditPage.css'
import 'src/styles/General.css'
import 'src/styles/text.css'


export default class AddCredit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typedAmount: '',
    }
  }

  _handleInputChange = (event) => {
    this.setState({typedAmount: event.target.value})
  }

  _handleButtonClick = (event) => {
    const {typedAmount} = this.state
    const {onCreditChange, user} = this.props

    event.preventDefault()

    if (!user) {
      alert(messages['not logged in'])
      return
    }

    if (typedAmount === '' || isNaN(typedAmount) || parseInt(typedAmount) <= 0) {
      alert(messages["invalid credit input"])
    } else {
      changeCreditAPI(typedAmount, user.token).then(function(response) {
        if (response === true) {
          onCreditChange(typedAmount)
        } else {
          alert(messages["bank issue. try again"])
        }
      })
    }

  }

  render() {
    const {user} = this.props
    return (
      <div className="addCreditContainer rtl">
        <div className="currentCreditBox">
          <div className="addCreditTxt greyTxt">
            {Fa['current credit']}
          </div>
          <div className="addCreditNumberTxt blackTxt">
            {user && user.credit}
            {!user && messages['not logged in']}
            {Fa["NBSP"]}
          </div>
          <div className="addCreditTxt greyTxt">
            {user && Fa['Touman']}
          </div>
        </div>
        <form action="" className="addCreditBox">
          <div className="toumanTag addCreditSmallTxt greyTxt">
            {Fa['Touman']}
          </div>
          <input
            className="creditInput curvedCorner greyTxt"
            type="text"
            placeholder={Fa['amount to be added']}
            onChange={this._handleInputChange}
          />
          <button className="addCreditBtn curvedCorner" onClick={this._handleButtonClick}>
            <p className="text addCreditBtnTxt">
              {Fa['increase credit']}
            </p>
          </button>
        </form>
      </div>
    )
  }
}
