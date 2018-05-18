import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/HomeDetail/HomeDetail.css'
import 'src/styles/General.css'
import { isForSale, isRental } from 'src/utilities/formats'


export default class HomeTag extends Component {
  render() {
    const {dealType} = this.props
    if (isRental(dealType)) {
      return <div className="tagCommon tagText rentalTagCustom curvedCorner">{Fa["Rahn and rent"]}</div>
    } else if (isForSale(dealType)) {
      return <div className="tagCommon tagText sellingTagCustom curvedCorner">{Fa["sell"]}</div>
    } else {
      return <div/>
    }
  }
}