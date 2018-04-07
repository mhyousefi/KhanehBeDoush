import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddCreditPage from 'src/components/pages/AddCreditPage'
import HomePage from 'src/components/pages/HomePage'
import SearchResultsPage from 'src/components/pages/SearchResultsPage'
import HomeDetailPage from './components/pages/HomeDetailPage'


export default class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/AddCredit' component={AddCreditPage}/>
        <Route path='/SearchResults' component={SearchResultsPage}/>
        <Route path='/HomeDetail/:houseId' component={HomeDetailPage}/>
      </Switch>
    )
  }
}
