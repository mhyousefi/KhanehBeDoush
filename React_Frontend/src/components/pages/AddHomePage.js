import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import LoginDialog from 'src/components/general/Login/LoginDialog'

import Fa from 'src/constants/Fa'
import DealTypeTabs from '../general/AddHome/DealTypeTabs'


export default class AddHomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginDialogOpen: false,
    }
  }

  handleModalClose = () => {
    this.setState({ loginDialogOpen: false });
  }

  handleModalOpen = () => {
    this.setState({ loginDialogOpen: true });
  }

  render () {
    const { user, onCreditChange, onLogin, onLogout } = this.props
    const { loginDialogOpen } = this.state
    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['add home page']}
        user={user}
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
        onLogout={onLogout}
      >
        <LoginDialog
          open={loginDialogOpen}
          onDialogClose={this.handleModalClose}
          onLogin={onLogin}
        />
        <br/><br/>
        <DealTypeTabs user={user}/>
      </Layout>
    )
  }
}