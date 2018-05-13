import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'
import LoginDialog from '../general/Login/LoginDialog'


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
    const { user, onCreditChange, onLogin } = this.props
    const { loginDialogOpen } = this.state
    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['add home page']}
        user={user}
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
      >
        <LoginDialog
          open={loginDialogOpen}
          onDialogClose={this.handleModalClose}
          onLogin={onLogin}
        />
      </Layout>
    )
  }
}