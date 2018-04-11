import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import SearchBox from 'src/components/general/SearchBox/SearchBox'
import { searchHousesAPI } from 'src/api/HouseApis'
import Fa from 'src/constants/Fa'
import 'src/styles/PageContainers.css'
import 'src/styles/SearchResultsPage/SearchBox.css'


export default class SearchResultsPage extends Component {
  constructor (props) {
      super(props)
      this.state = {
        houses: []
      }
   }

  _searchForHouses = (maxPrice, minArea, propertyType, dealType) => {
    searchHousesAPI(maxPrice, minArea, propertyType, dealType).then((response) => {
      console.log("RESPONSE: ")
      console.log(response)
      this.setState({houses: response})
    })
  }

  componentWillMount() {
    const {maxPrice, minArea, propertyType, dealType} = this.props.match.params
    this._searchForHouses(maxPrice, minArea, propertyType, dealType)
  }

  render () {
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
        <SearchBox houses={this.state.houses}/>
      </Layout>
    )
  }
}