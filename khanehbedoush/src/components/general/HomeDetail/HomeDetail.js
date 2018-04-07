import React, { Component } from 'react'
import 'src/styles/General.css'
import 'src/styles/HomeDetail/HomeDetail.css'
import HomeDetailInfo from './HomeDetailInfo'

export default class HomeDetail extends Component {
  render () {
    const { house } = this.props
    return (
      <div className="homeDetailContainer">
        <HomeDetailInfo houseId={house["id"]}/>
        <div className="homeDetailLeft">
          <img className="homeDetailPhoto curvedCorner" src={house['image']} alt={house['phoneNumber']}/>
          <div className="phoneNumStatus curvedCorner">
            مشاهده شماره مالک/مشاور
          </div>
        </div>
      </div>
    )
  }
}