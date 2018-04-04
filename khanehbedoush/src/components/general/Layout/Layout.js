import React from 'react'
import {Component} from 'react'
import '../../../styles/General.css'
import '../../../styles/Background.css'
import '../../../styles/PageContainers.css'
import GeneralHeader from './Header/GeneralHeader'
import Footer from './Footer'

export default class Layout extends Component {
  render() {
    return (
      <div className="body">
        <GeneralHeader/>
        <div className="defaultPageContainer">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}