import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './styles/General.css'
import Layout from './components/general/layout/Layout'

export default class App extends Component {
  render () {
    return (
      <Layout>
        <h1>HEYYYYYY I DID IT!</h1>
      </Layout>
    )
  }
}
