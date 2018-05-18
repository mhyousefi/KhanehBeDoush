import React, { Component } from 'react'
import { _HomePageInfo } from 'src/constants/FaTexts'
import InfoSentence from './InfoSentence'
import whyKhanehBeDoushPhoto from 'src/assets/images/why-khanebedoosh.jpg'
import 'src/styles/HomePage/HomePageInfo.css'


export default class HomePageInfo extends Component {
  render () {
    const slogans = _HomePageInfo["slogans"]
    return (
      <div className="homePageInfoContainer">
        <div className="homePageInfoTitle">
          {_HomePageInfo["title"]}
        </div>
        <div className="homePageInfoLower">
          <div className="homePageInfoSentences">
            {slogans.map((slogan, c) => (
              <InfoSentence slogan={slogan} key={c}/>
            ))}
          </div>
          <div className="homePageInfoImgContainer">
            <img className="homePageInfoImg" src={whyKhanehBeDoushPhoto}/>
          </div>
        </div>
      </div>
    )
  }
}
