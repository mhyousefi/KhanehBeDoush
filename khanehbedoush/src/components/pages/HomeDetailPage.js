import React, { Component } from 'react'
import { getHouseWithIdAPI } from 'src/api/HouseApis'
import { hasPaidForPhoneNumAPI } from 'src/api/PhoneNumPurchase'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'


export default class HomeDetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResult: null,
      hasPaidForPhoneNum: false
    }
  }

  _getHouseFromServer = (houseId) => {
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

  _getPaymentStatus = (houseId) => {
    hasPaidForPhoneNumAPI(houseId).then((response) => {
      console.log('STATUS ===> ' + response)
      if (response === true) {
        this.setState({hasPaidForPhoneNum: true})
      }
    })
  }

  componentDidMount() {
    console.log("HELLO")
    const {houseId} = this.props.match.params
    this._getHouseFromServer(houseId)
    this._getPaymentStatus(houseId)
  }

  componentWillUnmount() {
    console.log("WILL BE UNMOUNTED!")
  }

  render () {
    const {houseId} = this.props.match.params
    const {credit, onCreditChange} = this.props
    const {searchResult, hasPaidForPhoneNum} = this.state

    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['home detail page']}
        credit={credit}
        onCreditChange={onCreditChange}
      >
        <HomeDetail
          house={searchResult}
          houseId={houseId}
          credit={credit}
          hasPaid={hasPaidForPhoneNum}
          onCreditChange={onCreditChange}
        />
      </Layout>
    )
  }
}