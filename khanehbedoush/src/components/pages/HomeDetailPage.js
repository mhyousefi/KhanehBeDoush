import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import { getHouseWithId } from 'src/api/HouseApis'
import Fa from 'src/constants/Fa'
import { hasPaidForPhoneNum } from 'src/api/PhoneNumPurchase'


export default class HomeDetailPage extends Component {
  render() {
    const {houseId} = this.props.match.params
    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa["home detail page"]}
        credit={this.props.credit}
        onCreditChange={this.props.onCreditChange}
      >
        <HomeDetail
          house={getHouseWithId(houseId)}
          hasPaid={hasPaidForPhoneNum(houseId)}
          onCreditChange={this.props.onCreditChange}
        />
      </Layout>
    )
  }
}