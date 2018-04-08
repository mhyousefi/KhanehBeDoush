import React, { Component } from 'react'
import { Paper, MuiThemeProvider } from 'material-ui'
import HomeDetailInfoRow from './HomeDetailInfoRow'
import Fa from 'src/constants/Fa'
import 'src/styles/HomeDetail/HomeDetail.css'
import 'src/styles/General.css'


export default class HomeDetailInfo extends Component {
  _createPriceInfo = (priceInfo) => {
    let rows = []
    if (this.props.house["dealType"] === "rental") {
      rows.push(<HomeDetailInfoRow rightText={Fa["Rahn"]} leftText={priceInfo["basePrice"] + " " + Fa["Touman"]}/>)
      rows.push(<div className="separatingLine"/>)
      rows.push(<HomeDetailInfoRow rightText={Fa["rent"]} leftText={priceInfo["rentPrice"] + " " + Fa["Touman"]}/>)
      rows.push(<div className="separatingLine"/>)
    } else {
      rows.push(<HomeDetailInfoRow rightText={Fa["price"]} leftText={priceInfo["sellPrice"] + " " + Fa["Touman"]}/>)
      rows.push(<div className="separatingLine"/>)
    }
    return rows;
  }

  _createTag = () => {
    if (this.props.house["dealType"] === "rental") {
      return <div className="tagCommon tagText rentalTagCustom curvedCorner">{Fa["Rahn and rent"]}</div>
    } else {
      return <div className="tagCommon tagText sellingTagCustom curvedCorner">{Fa["sell"]}</div>
    }
  }

  render() {
    const { house } = this.props
    return (
      <div className="homeDetailRight">
        <MuiThemeProvider>
          {this._createTag()}
          <Paper className="homeDetailPaper" zDepth={2}>
            <HomeDetailInfoRow rightText={Fa["owner phone number"]} leftText={house["phoneNumber"]}/>
            <div className="separatingLine"/>
            <HomeDetailInfoRow rightText={Fa["property type"]} leftText={house["propertyType"]}/>
            <div className="separatingLine"/>

            {this._createPriceInfo(house["priceInfo"])}

            <HomeDetailInfoRow rightText={Fa["address"]} leftText={house["district"]}/>
            <div className="separatingLine"/>
            <HomeDetailInfoRow rightText={Fa["area"]} leftText={house["area"] + " " + Fa["meters square"]}/>
            <div className="separatingLine"/>
            <HomeDetailInfoRow rightText={Fa["description"]} leftText={house["description"]}/>
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}