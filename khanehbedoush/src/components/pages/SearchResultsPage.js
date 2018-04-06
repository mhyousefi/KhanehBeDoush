import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import SearchBox from 'src/components/general/SearchBox/SearchBox'
import Fa from 'src/constants/Fa'


export default class SearchResults extends Component {
  render() {
    return (
      <Layout>
        <div className="addCreditContainer rtl">
          <div className="searchResultsUpperSentence‌">
            {Fa["SearchResults upper sentence"]}
          </div>
          <SearchBox/>
        </div>
      </Layout>
    )
  }
}