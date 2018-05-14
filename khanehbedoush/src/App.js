import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddCreditPage from 'src/components/pages/AddCreditPage'
import HomePage from 'src/components/pages/HomePage'
import SearchResultsPage from 'src/components/pages/SearchResultsPage'
import HomeDetailPage from './components/pages/HomeDetailPage'
import AddHomePage from './components/pages/AddHomePage'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('user')) {
      let receivedObj = localStorage.getItem('user')
      this.setState({user: JSON.parse(receivedObj)})
    }
  }

  componentWillUnmount() {
    localStorage.clear()
  }

  _handleCreditChange = (amount) => {
    const { user } = this.state
    if (!isNaN(amount)) {
      const newCredit = parseInt(user['credit']) + parseInt(amount)
      let newUser = user
      newUser['credit'] = newCredit
      this.setState({user: newUser})
    }
  }

  _handleLogin = (loggedInUser) => {
    this.setState({user: loggedInUser})
    localStorage.setItem('user', JSON.stringify(loggedInUser))
  }

  _renderHomePage = () => {
    return (
      <HomePage
        user={this.state.user}
        onCreditChange={this._handleCreditChange}
        onLogin={this._handleLogin}
      />
    )
  }

  _renderAddCreditPage = () => {
    return (
      <AddCreditPage
        user={this.state.user}
        onCreditChange={this._handleCreditChange}
        onLogin={this._handleLogin}
      />
    )
  }

  _renderSearchResultsPage = (props) => {
    return (
      <SearchResultsPage
        match={props.match}
        user={this.state.user}
        onCreditChange={this._handleCreditChange}
        onLogin={this._handleLogin}
      />
    )
  }

  _renderHomeDetailPage = (props) => {
    return (
      <HomeDetailPage
        match={props.match}
        user={this.state.user}
        onCreditChange={this._handleCreditChange}
        onLogin={this._handleLogin}
      />
    )
  }

  _renderAddHomePage = (props) => {
    return (
      <AddHomePage
        match={props.match}
        user={this.state.user}
        onCreditChange={this._handleCreditChange}
        onLogin={this._handleLogin}
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
        <Route
          exact path='/AddHome'
          render={this._renderAddHomePage}
        />
      </Switch>
    )
  }
}
