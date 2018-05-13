import { TextField, withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import Fa from 'src/constants/Fa'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
})

class PriceInfoSelect extends React.Component {
  _onSellingPriceChange = (event) => {
    this.props.onSellingPriceChange(event.target.value)
  }

  _onRentPriceChange = (event) => {
    this.props.onRentPriceChange(event.target.value)
  }

  _onBasePriceChange = (event) => {
    this.props.onBasePriceChange(event.target.value)
  }

  render () {
    const {classes, dealType} = this.props

    if (dealType === 'sale') {
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label={Fa['selling price']}
            className={classes.textField}
            margin="normal"
            onChange={this._onSellingPriceChange}
          />
        </form>
      )
    } else {
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label={Fa['base price']}
            className={classes.textField}
            margin="normal"
            onChange={this._onBasePriceChange}
          />
          <TextField
            label={Fa['rent price']}
            className={classes.textField}
            margin="normal"
            onChange={this._onRentPriceChange}
          />
        </form>
      )
    }
  }
}

PriceInfoSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PriceInfoSelect)