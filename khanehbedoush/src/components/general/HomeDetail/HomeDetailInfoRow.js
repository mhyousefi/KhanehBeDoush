import React, { Component } from 'react'
import 'src/styles/HomeDetail/HomeDetail.css'

export default class HomeDetailInfoRow extends Component {
  render () {
    const { rightText, leftText } = this.props
    return (
      <div className="infoRow">
        <div className="infoRowRight">
          {rightText}
        </div>
        <div className="infoRowLeft">
          {leftText}
        </div>
      </div>
    )
  }
}