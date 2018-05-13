import React, { Component } from 'react'
import { getHouseWithIdAPI } from 'src/api/HouseApis'
import { hasPaidForPhoneNumAPI } from 'src/api/PhoneNumPurchase'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'
import LoginDialog from '../general/Login/LoginDialog'


export default class HomeDetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResult: null,
      hasPaidForPhoneNum: false,
      modalOpen: false,
    }
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  }

  _getHouseFromServer = (houseId) => {
    getHouseWithIdAPI(houseId).then((response) => {
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
    hasPaidForPhoneNumAPI(houseId, this.props.user.token).then((response) => {
      console.log('HAS PAID FOR PHONE NUMBER ===> ' + response)
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
    const { user, onCreditChange, onLogin } = this.props
    const { searchResult, hasPaidForPhoneNum, modalOpen } = this.state

    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['home detail page']}
        credit={user.credit}
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
      >
        <LoginDialog
          open={modalOpen}
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