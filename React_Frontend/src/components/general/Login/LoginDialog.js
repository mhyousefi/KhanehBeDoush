import React, { Component } from 'react'
import { TextField } from 'material-ui'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import Fa from 'src/constants/Fa'
import 'src/styles/General.css'
import { LoginAPI } from 'src/api/LoginAPI'
import { messages } from 'src/constants/FaTexts'


export default class LoginDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      phoneNumber: '',
    }
  }

  transition = (props) => {
    return <Slide direction="up" {...props}/>
  }

  _onUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  _onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  _onPhoneNumberChange = (event) => {
    this.setState({phoneNumber: event.target.value})
  }

  _responseIsValid = (response) => {
    return (response['name'] && response['credit'] && response['token'])
  }

  _onButtonClick = () => {
    const { onLogin, onDialogClose } = this.props
    const { username, password, phoneNumber } = this.state
    LoginAPI(username, password, phoneNumber).then((response) => {
      if (response === 'wrong input') {
        alert(messages['wrong inputs'])
      } else if (response === 'server error') {
        alert(messages['server error'])
      } else {
        if (this._responseIsValid(response)) {
          const user = {
            name: response['name'],
            credit: response['credit'],
            token: response['token'],
          }
          onLogin(user)
          onDialogClose()
        }
      }
    })
  }

  render () {
    const {open, onDialogClose} = this.props
    return (
      <Dialog
        open={open}
        TransitionComponent={this.transition}
        keepMounted
        onClose={onDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="rtl"
        fullWidth
      >
        <DialogTitle id="alert-dialog-slide-title">
          {Fa['sign in title']}
        </DialogTitle>
        <DialogContent className="text-right">
          <DialogContentText id="alert-dialog-slide-description">
            {Fa['sign in text']}
          </DialogContentText>
          <br/>
          <div className='center'>
            <TextField
              id="input-with-icon-textfield"
              label={Fa['username']}
              onChange={this._onUsernameChange}
            />
            &nbsp;&nbsp;
            <TextField
              id="input-with-icon-textfield"
              label={Fa['password']}
              onChange={this._onPasswordChange}
            />
            &nbsp;&nbsp;
            <TextField
              id="input-with-icon-textfield"
              label={Fa['phone number']}
              onChange={this._onPhoneNumberChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this._onButtonClick} color="secondary">
            {Fa['sign in']}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}