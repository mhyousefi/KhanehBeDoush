import React, { Component } from 'react'
import { messages } from 'src/constants/FaTexts'
import { changeCredit } from 'src/api/BankApi'
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
    event.preventDefault()
    if (typedAmount === '' || isNaN(typedAmount) || parseInt(typedAmount) <= 0) {
      alert(messages["not a number"])
    } else {
      if (changeCredit(parseInt(typedAmount))) {
        this.props.onCreditChange(typedAmount)
      } else {
        alert(messages["bank issue. try again."])
      }
    }
  }

  render() {
    return (
      <div className="addCreditContainer rtl">
        <div className="currentCreditBox">
          <div className="addCreditTxt greyTxt">
            {Fa['current credit']}
          </div>
          <div className="addCreditNumberTxt blackTxt">
            {this.props.credit} {Fa["NBSP"]}
          </div>
          <div className="addCreditTxt greyTxt">
            {Fa['Touman']}
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