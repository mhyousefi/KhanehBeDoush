import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import { testHouses } from 'src/constants/FaTexts'
import Fa from 'src/constants/Fa'


export default class HomeDetailPage extends Component {
  _getHouseWithId = (houseId) => {
    return testHouses[parseInt(houseId, 10)]
  }

  render() {
    const {match} = this.props
    const {houseId} = match.params
    return (
      <Layout isHomePage={false} pageTitle={Fa["home detail page"]}>
        <HomeDetail house={this._getHouseWithId(houseId)}/>
      </Layout>
    )
  }
}