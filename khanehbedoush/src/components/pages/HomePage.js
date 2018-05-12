import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import HomePageAdBox from 'src/components/general/HomePage/HomePageAdBox'
import HomePageInfo from 'src/components/general/HomePage/HomePageInfo'
import Fa from 'src/constants/Fa'
import SignInDialog from 'src/components/general/SignIn/SignInDialog'


export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
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
    const { modalOpen } = this.state
    return (
      <Layout
        isHomePage={true}
        pageTitle={Fa["home page"]}
        user={user}
        onCreditChange={onCreditChange}
        onLoginModalOpen={this.handleModalOpen}
        onLogin={onLogin}
      >
        <SignInDialog
          open={modalOpen}
          onDialogClose={this.handleModalClose}
        />
        <HomePageAdBox/>
        <HomePageInfo/>
      </Layout>
    )
  }
}

// const SimpleModalWrapped = (HomePage)