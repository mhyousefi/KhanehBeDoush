import React, { Component } from 'react'
import 'src/styles/HomePage/HomePageInfo.css'


export default class InfoSentence extends Component {
  render() {
    return (
      <div className="homePageSentence homePageTextRow">
        <i className="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
        {this.props.slogan}
      </div>
    )
  }
}