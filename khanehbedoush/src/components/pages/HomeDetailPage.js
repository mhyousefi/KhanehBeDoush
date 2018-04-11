import React, { Component } from 'react'
import { getHouseWithIdAPI } from 'src/api/HouseApis'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'

export default class HomeDetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResult: null,
    }
  }

  _getHouseFromServer = () => {
    const {houseId} = this.props.match.params
    getHouseWithIdAPI(houseId).then((response) => {
      console.log("response: ")
      console.log(response)

      let priceInfo = {}
      if (response['dealType'] === Fa['purchase']) {
        priceInfo = {'sellingPrice': response['sellingPrice'],}
      } else if (response['dealType'] === Fa['purchase']) {
        priceInfo = {
          'basePrice': response['basePrice'],
          'rentPrice': response['rentPrice'],
        }
      }

      this.setState({
        searchResult: {
          'priceInfo': priceInfo,
          'dealType': response['dealType'],
          'propertyType': response['propertyType'],
          'phoneNumber': response['phoneNumber'],
          'area': response['area'],
          'district': response['address'],
          'description': response['description'],
          'imageUrl': response['imageUrl'],
        },
      })
    })
  }

  render () {
    const {credit, onCreditChange} = this.props
    const {searchResult} = this.state

    this._getHouseFromServer()

    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['home detail page']}
        credit={credit}
        onCreditChange={onCreditChange}
      >
        <HomeDetail
          house={searchResult}
          hasPaid={true}
          onCreditChange={onCreditChange}
        />
      </Layout>
    )
  }
}