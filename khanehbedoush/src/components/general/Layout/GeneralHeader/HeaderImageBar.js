import React, { Component } from 'react'
import 'src/styles/Header/Header.css'

export default class HeaderImageBar extends Component {
  render() {
    const { pageTitle } = this.props
    return (
      <div className="headerImageBarContainer">
        <div className="headerImageBar">
          <div className="headerImageBarTitle">
            {pageTitle}
          </div>
        </div>
      </div>
    )
  }
}