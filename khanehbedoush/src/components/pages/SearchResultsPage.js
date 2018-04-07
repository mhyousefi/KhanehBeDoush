import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import SearchBox from 'src/components/general/SearchBox/SearchBox'
import Fa from 'src/constants/Fa'
import { testHouses } from 'src/constants/FaTexts'
import 'src/styles/PageContainers.css'
import 'src/styles/SearchResultsPage/SearchBox.css'

export default class SearchResults extends Component {
  render () {
    return (
      <Layout isHomePage={false} pageTitle={Fa["search results page"]}>
        <div className="searchResultsUpperSentence‌">
          {Fa['SearchResults upper sentence']}
        </div>
        <SearchBox houses={testHouses}/>
      </Layout>
    )
  }
}