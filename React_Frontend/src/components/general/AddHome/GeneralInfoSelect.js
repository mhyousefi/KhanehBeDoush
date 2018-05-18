import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, TextField } from 'material-ui'
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
});

class GeneralInfoSelect extends React.Component {
  _onAddressChange = (event) => {
    this.props.onAddressChange(event.target.value)
  }

  _onPhoneNumberChange = (event) => {
    this.props.onPhoneNumberChange(event.target.value)
  }

  _onAreaChange = (event) => {
    this.props.onAreaChange(event.target.value)
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label={Fa['address']}
          className={classes.textField}
          margin="normal"
          onChange={this._onAddressChange}
        />
        <TextField
          label={Fa['area']}
          className={classes.textField}
          margin="normal"
          onChange={this._onAreaChange}
        />
        <TextField
          label={Fa['phone number']}
          className={classes.textField}
          margin="normal"
          onChange={this._onPhoneNumberChange}
        />
      </form>
    );
  }
}

GeneralInfoSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralInfoSelect);