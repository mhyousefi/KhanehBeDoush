import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import HomePageAdBox from 'src/components/general/HomePageComponents/HomePageAdBox'
import HomePageInfo from 'src/components/general/HomePageComponents/HomePageInfo'
import Fa from 'src/constants/Fa'

export default class HomePage extends Component {
  render () {
    return (
      <Layout isHomePage={true} pageTitle={Fa["home page"]}>
        <HomePageAdBox/>
        <HomePageInfo/>
      </Layout>
    )
  }
}