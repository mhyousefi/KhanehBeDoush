import React, { Component } from 'react'
import HomeDetailInfo from './HomeDetailInfo'
import { homeDetailMessages as messages } from 'src/constants/FaTexts'
import 'src/styles/General.css'
import 'src/styles/HomeDetail/HomeDetail.css'

export default class HomeDetail extends Component {
  state = {
    phoneNumVisible: false,
    message: messages["show phone number"]
  }

  _createMessage = () => {
    return this.state.phoneNumVisible
  }

  __handleButtonClick = () => {
    this.setState({
      phoneNumVisible: true,
      message: ''
    })

  }

  render () {
    const { house } = this.props
    return (
      <div className="homeDetailContainer">
        <HomeDetailInfo house={house}/>
        <div className="homeDetailLeft">
          <img className="homeDetailPhoto curvedCorner" src={house['image']} alt={house['phoneNumber']}/>
          {(this.state.phoneNumVisible === false) && <div className="phoneNumStatus curvedCorner" onClick={this._handleButtonClick}>
            {this.state.message}
          </div>}
        </div>
      </div>
    )
  }
}