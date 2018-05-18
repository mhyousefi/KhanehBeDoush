import React, { Component } from 'react'
import Link from 'react-router-dom/es/Link'
import Button from 'material-ui/es/Button/Button'
import Fa from 'src/constants/Fa'
import 'src/styles/General.css'


export default class AddHomeBtn extends Component {
  render() {
    return (
      <Link to='/AddHome' className="noUnderLine">
        <Button color="default" className="btnText">
          {Fa['add home page']}
        </Button>
      </Link>
    )
  }
}