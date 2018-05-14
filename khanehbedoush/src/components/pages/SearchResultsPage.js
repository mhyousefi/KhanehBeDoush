import React, { Component } from 'react'
import { searchHousesAPI } from 'src/api/HouseApis'
import Layout from 'src/components/general/Layout/Layout'
import SearchBox from 'src/components/general/SearchBox/SearchBox'
import Fa from 'src/constants/Fa'
import 'src/styles/PageContainers.css'
import 'src/styles/SearchResultsPage/SearchBox.css'
import LoginDialog from 'src/components/general/Login/LoginDialog'

export default class SearchResultsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      houses: [],
      modalOpen: false,
    }
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  }

  _searchForHouses = (maxPrice, minArea, propertyType, dealType) => {
    searchHousesAPI(maxPrice, minArea, propertyType, dealType).then((response) => {
      this.setState({houses: response})
    })
  }

  componentDidMount () {
    let {maxPrice, minArea, propertyType, dealType} = this.props.match.params
    maxPrice = maxPrice === 'none' ? '' : maxPrice
    minArea = minArea === 'none' ? '' : minArea
    propertyType = propertyType === 'none' ? '' : propertyType
    dealType = dealType === 'none' ? '' : dealType
    this._searchForHouses(maxPrice, minArea, propertyType, dealType)
  }

  render () {
    const { user, onCreditChange, onLogin } = this.props
    const { houses, modalOpen } = this.state

    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['search results page']}
        user={user}
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
      >
        <LoginDialog
          open={modalOpen}
          onDialogClose={this.handleModalClose}
          onLogin={onLogin}
        />
        <div className="searchResultsUpperSentence‌">
          {Fa['SearchResults upper sentence']}
        </div>
        <SearchBox houses={houses}/>
      </Layout>
    )
  }
}