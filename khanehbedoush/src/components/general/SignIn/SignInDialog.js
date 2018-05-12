import React, { Component } from 'react'
import { TextField } from 'material-ui'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import Fa from 'src/constants/Fa'
import 'src/styles/General.css'

export default class SignInModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
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

  _onButtonClick = () => {
    //TODO: call a login API
    this.props.onDialogClose()
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

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this._onButtonClick} color="primary">
            {Fa['sign in']}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}