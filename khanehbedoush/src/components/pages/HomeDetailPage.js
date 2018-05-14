import React, { Component } from 'react'
import { getHouseWithIdAPI } from 'src/api/HouseApis'
import { hasPaidForPhoneNumAPI } from 'src/api/PhoneNumPurchase'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'
import LoginDialog from '../general/Login/LoginDialog'
import { isForSale, isRental } from 'src/utilities/formats'


export default class HomeDetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResult: null,
      hasPaidForPhoneNum: false,
      loginDialogOpen: false,
    }
  }

  handleModalClose = () => {
    this.setState({ loginDialogOpen: false });
  }

  handleModalOpen = () => {
    this.setState({ loginDialogOpen: true });
  }

  _getHouseFromServer = (houseId) => {
    const { user } = this.props
    if (!user) {
      return
    }

    getHouseWithIdAPI(houseId, user.token).then((response) => {
      let priceInfo = {}
      if (isForSale(response['dealType'])) {
        priceInfo = {'sellingPrice': response['sellingPrice'],}
      } else if (isRental(response['dealType'])) {
        priceInfo = {
          'basePrice': response['basePrice'],
          'rentPrice': response['rentPrice'],
        }
      }

      this.setState({
        searchResult: {
          'priceInfo': priceInfo,
          'dealType': response['dealType'],
          'propertyType': response['buildingType'],
          'phoneNumber': response['phone'],
          'area': response['area'],
          'district': response['address'],
          'description': response['description'],
          'imageUrl': response['imageURL'],
        }
      })
    })
  }

  _getPaymentStatus = (houseId) => {
    const { user } = this.props

    if (!user) {
      return false
    }

    hasPaidForPhoneNumAPI(user.token, houseId).then((response) => {
      if (response === true) {
        this.setState({hasPaidForPhoneNum: true})
      }
    })
  }

  componentDidMount() {
    const {houseId} = this.props.match.params
    this._getHouseFromServer(houseId)
    this._getPaymentStatus(houseId)
  }

  render () {
    const { houseId } = this.props.match.params
    const { user, onCreditChange, onLogin, onLogout } = this.props
    const { searchResult, hasPaidForPhoneNum, loginDialogOpen } = this.state

    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['home detail page']}
        user={user}
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
        onLogout={onLogout}
      >
        <LoginDialog
          open={loginDialogOpen}
          onDialogClose={this.handleModalClose}
          onLogin={onLogin}
        />
        <HomeDetail
          house={searchResult}
          hasPaid={hasPaidForPhoneNum}
          houseId={houseId}
          user={user}
          onCreditChange={onCreditChange}
          onLoginModalOpen={this.handleModalOpen}
        />
      </Layout>
    )
  }
}