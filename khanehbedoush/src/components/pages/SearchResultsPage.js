import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import SearchBox from 'src/components/general/SearchBox/SearchBox'
import { searchHouses } from 'src/api/HouseApis'
import Fa from 'src/constants/Fa'
import 'src/styles/PageContainers.css'
import 'src/styles/SearchResultsPage/SearchBox.css'

export default class SearchResults extends Component {

  render () {
    const {match} = this.props
    const {maxPrice, minArea, propertyType, dealType} = match.params
    return (
      <Layout isHomePage={false} pageTitle={Fa["search results page"]}>
        <div className="searchResultsUpperSentence‌">
          {Fa['SearchResults upper sentence']}
        </div>
        <SearchBox houses={searchHouses(maxPrice, minArea, propertyType, dealType)}/>
      </Layout>
    )
  }
}