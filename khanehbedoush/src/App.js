import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddCreditPage from 'src/components/pages/AddCreditPage'
import HomePage from 'src/components/pages/HomePage'
import SearchResultsPage from 'src/components/pages/SearchResultsPage'
import HomeDetailPage from './components/pages/HomeDetailPage'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customerCredit: '0',
    }
  }

  _handleCreditChange = (amount) => {
    if (!isNaN(amount)) {
      const newCredit = parseInt(this.state.customerCredit) + parseInt(amount)
      this.setState({customerCredit: newCredit})
    }
  }

  _renderHomePage = () => {
    return (
      <HomePage
        credit={this.state.customerCredit}
        onCreditChange={this._handleCreditChange}
      />
    )
  }

  _renderAddCreditPage = () => {
    return (
      <AddCreditPage
        credit={this.state.customerCredit}
        onCreditChange={this._handleCreditChange}
      />
    )
  }

  _renderSearchResultsPage = (match) => {
    return (
      <SearchResultsPage
        match={match}
        credit={this.state.customerCredit}
        onCreditChange={this._handleCreditChange}
      />
    )
  }

  _renderHomeDetailPage = () => {
    return (
      <HomeDetailPage
        credit={this.state.customerCredit}
        onCreditChange={this._handleCreditChange}
      />
    )
  }

  render () {
    return (
      <Switch>
        <Route
          exact path="/"
          render={this._renderHomePage}
        />
        <Route
          exact path='/AddCredit'
          render={this._renderAddCreditPage}
        />
        <Route
          exact path='/SearchResults/:maxPrice/:minArea/:propertyType/:dealType'
          render={this._renderSearchResultsPage}
        />
        <Route
          exact path='/HomeDetail/:houseId'
          render={this._renderHomeDetailPage}
        />
      </Switch>
    )
  }
}
