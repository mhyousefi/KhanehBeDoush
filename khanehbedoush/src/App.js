import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './styles/General.css'
import AddCreditPage from './components/pages/AddCreditPage'

export default class App extends Component {
  render () {
    return (
      <Switch>
        {/*<Route exact path='/' component={HomePage}/>*/}
        <Route exact path='/AddCredit' component={AddCreditPage}/>
        {/*<Route path='/SearchResults' component={SearchResultsPage}/>*/}
      </Switch>
    )
  }
}
