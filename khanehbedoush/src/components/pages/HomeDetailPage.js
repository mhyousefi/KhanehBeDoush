import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'


export default class HomeDetailPage extends Component {
  _getHouseWithId = (houseId) => {
    return {
      'id': '0',
      'phoneNumber': '۰۹۱۲۱۱۰۳۰۴۰',
      'dealType': 'sell',
      'propertyType': 'کلنگی',
      'district': 'امیر آباد',
      'area': '۱۱۰',
      'priceInfo': {
        'sellPrice': '۵۰۰۰۰۰',
        'rentPrice': '۶۰۰',
        'basePrice': '۷۶۰',
      },
      'image': 'https://www.newyorksightseeing.com/media/catalog/product/cache/29/thumbnail/9df78eab33525d08d6e5fb8d27136e95/e/s/esb_1_1.jpg',
      'description': 'میتونی باهاش یه برج با شکوه بسازی!',
    }
  }

  render() {
    const {match} = this.props
    const {houseId} = match.params
    console.log("&&&&&&&&&&&&&&& ======> " + houseId)
    return (
      <Layout isHomePage={false}>
        <HomeDetail house={this._getHouseWithId(houseId)}/>
      </Layout>
    )
  }
}