import React from 'react'
import {Component} from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/Footer/Footer.css'

import InstagramLogo from 'src/assets/images/icons/200px-Instagram_logo_2016.svg.png'
import TelegramLogo from 'src/assets/images/icons/200px-Telegram_logo.svg.png'
import TwitterLogo from 'src/assets/images/icons/Twitter_bird_logo_2012.svg.png'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footerContainer rtl">
        <div className="footerRow">
          <div className="footerTxt">
            {Fa['footer text']}
          </div>
          <div className="footerIcons">
            <div className="footerIcon">
              <img className="footerIconRelativeSize" src={InstagramLogo}/>
            </div>
            <div className="footerIcon">
              <img className="footerIconRelativeSize" src={TelegramLogo}/>
            </div>
            <div className="footerIcon">
              <img className="footerIconRelativeSize" src={TwitterLogo}/>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

