import React, { Component } from 'react'
import { Paper, MuiThemeProvider } from 'material-ui'
import { toPersian } from 'src/Utilities/formats'
import Fa from 'src/constants/Fa'
import HomeDetailInfoRow from './HomeDetailInfoRow'
import HomeTag from './HomeTag'
import 'src/styles/HomeDetail/HomeDetail.css'
import 'src/styles/General.css'


export default class HomeDetailInfo extends Component {
  _createPriceInfo = (priceInfo) => {
    let rows = []
    if (this.props.house["dealType"] === "rental") {
      rows.push(<HomeDetailInfoRow rightText={Fa["Rahn"]} leftText={toPersian(priceInfo["basePrice"]) + " " + Fa["Touman"]}/>)
      rows.push(<div className="separatingLine"/>)
      rows.push(<HomeDetailInfoRow rightText={Fa["rent"]} leftText={toPersian(priceInfo["rentPrice"]) + " " + Fa["Touman"]}/>)
      rows.push(<div className="separatingLine"/>)
    } else {
      rows.push(<HomeDetailInfoRow rightText={Fa["price"]} leftText={toPersian(priceInfo["sellingPrice"]) + " " + Fa["Touman"]}/>)
      rows.push(<div className="separatingLine"/>)
    }
    return rows;
  }

  _createPhoneNum = () => {
    const {phoneNumVisible, house} = this.props
    const persianPhoneNum = toPersian(house["phoneNumber"])
    return phoneNumVisible ? persianPhoneNum : (persianPhoneNum.substr(-3) + "******" + persianPhoneNum.substr(0, 3))
  }

  render() {
    const { house } = this.props
    return (
      <div className="homeDetailRight">
        <MuiThemeProvider>
          <HomeTag dealType={house["dealType"]}/>
          <Paper className="homeDetailPaper" zDepth={2}>
            <HomeDetailInfoRow rightText={Fa["owner phone number"]} leftText={this._createPhoneNum()}/><div className="separatingLine"/>
            <HomeDetailInfoRow rightText={Fa["property type"]} leftText={house["propertyType"]}/><div className="separatingLine"/>
            {this._createPriceInfo(house["priceInfo"])}
            <HomeDetailInfoRow rightText={Fa["address"]} leftText={house["district"]}/><div className="separatingLine"/>
            <HomeDetailInfoRow rightText={Fa["area"]} leftText={toPersian(house["area"]) + " " + Fa["meters square"]}/><div className="separatingLine"/>
            <HomeDetailInfoRow rightText={Fa["description"]} leftText={house["description"]}/>
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}