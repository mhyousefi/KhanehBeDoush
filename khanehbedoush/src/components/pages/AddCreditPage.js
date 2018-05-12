import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'
import AddCredit from 'src/components/general/AddCredit/AddCredit'
import SignInDialog from '../general/SignIn/SignInDialog'


export default class AddCreditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  }

  render () {
    const { user, onCreditChange, onLogin } = this.props
    return (
      <Layout
        isHomePage={false}
        pageTitle={Fa['add credit page']}
        user
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
      >
        <SignInDialog
          open={this.state.modalOpen}
          onDialogClose={this.handleModalClose}
          onLogin={onLogin}
        />
        <AddCredit
          user={user}
          onCreditChange={onCreditChange}
        />
      </Layout>
    )
  }
}