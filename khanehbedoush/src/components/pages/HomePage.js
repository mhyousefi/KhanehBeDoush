import React, { Component } from 'react'
import HomePageLayout from 'src/components/general/Layout/HomePageLayout'
import HomePageAdBox from 'src/components/general/HomePageComponents/HomePageAdBox'
import HomePageInfo from 'src/components/general/HomePageComponents/HomePageInfo'

export default class HomePage extends Component {
  render () {
    return (
      <HomePageLayout>
        <HomePageAdBox/>
        <HomePageInfo/>
      </HomePageLayout>
    )
  }
}