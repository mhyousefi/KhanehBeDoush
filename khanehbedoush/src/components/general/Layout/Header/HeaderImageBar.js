import React, { Component } from 'react'
import Fa from '../../../../constants/Fa'
import 'src/styles/Header/Header.css'

export default class HeaderImageBar extends Component {
  render() {
    return (
      <div className="headerImageBarContainer">
        <div className="headerImageBar">
          <div className="headerImageBarTitle">
            {Fa['increase balance']}
          </div>
        </div>
      </div>
    )
  }
}