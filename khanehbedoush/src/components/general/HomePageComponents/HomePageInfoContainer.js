import React, { Component } from 'react'
import Fa from 'src/constants/Fa'

export default class HomePageInfoContainer extends Component {
  render () {
    return (
      <div class="homePageInfoContainer">
        <div class="homePageInfoTitle">
          {Fa['HomePageInfoTitle']}
        </div>
        // TODO: use map for rendering these slogans
        <div class="homePageInfoLower">
          <div class="homePageInfoSentences">
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan1"]}
            </div>
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan2"]}
            </div>
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan3"]}
            </div>
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan4"]}
            </div>
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan5"]}
            </div>
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan6"]}
            </div>
            <div class="homePageSentence homePageTextRow">
              <i class="fas fa-check-circle homePageTextIcon">&nbsp;&nbsp;</i>
              {Fa["HomePageInfoSlogan7"]}
            </div>
          </div>
          <div class="homePageInfoImgContainer">
            <div class="homePageInfoImg"/>
          </div>
        </div>
      </div>
    )
  }
}

