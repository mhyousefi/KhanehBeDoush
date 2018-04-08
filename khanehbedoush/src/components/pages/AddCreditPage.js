import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'
import AddCredit from 'src/components/general/AddCredit/AddCredit'


export default class AddCreditPage extends Component {


  render () {
    return (
      <Layout isHomePage={false} pageTitle={Fa['add credit page']}>
        <AddCredit/>
      </Layout>
    )
  }
}