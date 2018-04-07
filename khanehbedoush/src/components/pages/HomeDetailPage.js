import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import HomeDetail from 'src/components/general/HomeDetail/HomeDetail'
import { house1, house2 } from 'src/constants/FaTexts'


export default class HomeDetailPage extends Component {
  render() {
    return (
      <Layout isHomePage={false}>
        <HomeDetail house={house1}/>
      </Layout>
    )
  }
}