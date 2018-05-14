import React, { Component } from 'react'
import HomePageHeaderLower from './HomePageHeaderLower'
import HomePageHeaderMiddle from './HomePageHeaderMiddle'
import HomePageHeaderUpper from './HomePageHeaderUpper'
import 'src/styles/Header/fadingHeader.css'
import 'src/styles/HomePage/HomePageHeader.css'

import HomePageHeaderPic1 from 'src/assets/images/Banner/casey-horner-533586-unsplash.jpg'
import HomePageHeaderPic2 from 'src/assets/images/Banner/luke-van-zyl-504032-unsplash.jpg'
import HomePageHeaderPic3 from 'src/assets/images/Banner/mahdiar-mahmoodi-452489-unsplash.jpg'
import HomePageHeaderPic4 from 'src/assets/images/Banner/michal-kubalczyk-260909-unsplash.jpg'

export default class HomePageHeader extends Component {
  render () {
    const { user, onLogout, onLoginModalOpen } = this.props
    return (
      <header className="homePageHeaderContainer">
        <div id="cf3">
          <img className="last" src={HomePageHeaderPic1}/>
          <img className="first" src={HomePageHeaderPic2}/>
          <img className="second" src={HomePageHeaderPic3}/>
          <img className="third" src={HomePageHeaderPic4}/>

          <HomePageHeaderUpper
            user={user}
            onLoginModalOpen={onLoginModalOpen}
            onLogout={onLogout}
          />
          <HomePageHeaderMiddle/>
          <HomePageHeaderLower/>
        </div>
      </header>
    )
  }
}