import React, { Component } from 'react'
import 'src/styles/HomePage/HomePageAdBox.css'
import 'src/styles/HomePage/HomePageResponsive.css'


export default class AdBox extends Component {
  render() {
    return (
      <div className="homePageAdBox curvedCorner">
        <img className="homePageAdBoxImage" src={this.props.image}/>
        <div className="homePageAdBoxTxtArea">
          <div className="homePageAdBoxTitle">
            {this.props.title}
          </div>
          <div className="homePageAdBoxTxt">
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}