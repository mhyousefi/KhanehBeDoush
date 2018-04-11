import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomeDetail/HomeDetail.css'
import 'src/styles/General.css'


export default class  extends Component {
  render() {
    const {dealType} = this.props
    if (dealType === "rental") {
      return <div className="tagCommon tagText rentalTagCustom curvedCorner">{Fa["Rahn and rent"]}</div>
    } else {
      return <div className="tagCommon tagText sellingTagCustom curvedCorner">{Fa["sell"]}</div>
    }
  }
}