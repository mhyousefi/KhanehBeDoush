import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import SearchBox from 'src/components/general/SearchBox/SearchBox'
import { searchHouses } from 'src/api/HouseApis'
import Fa from 'src/constants/Fa'
import 'src/styles/PageContainers.css'
import 'src/styles/SearchResultsPage/SearchBox.css'

export default class SearchResultsPage extends Component {

  render () {
    console.log("HERE IS match.params ========> ")
    console.log(this.props.match)
    const {maxPrice, minArea, propertyType, dealType} = this.props.match.params
    const {credit, onCreditChange} = this.props

    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa["search results page"]}
        credit={credit}
        onCreditChange={onCreditChange}
      >
        <div className="searchResultsUpperSentence‌">
          {Fa['SearchResults upper sentence']}
        </div>
        <SearchBox houses={searchHouses(maxPrice, minArea, propertyType, dealType)}/>
      </Layout>
    )
  }
}