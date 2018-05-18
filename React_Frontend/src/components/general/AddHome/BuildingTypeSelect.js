import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, InputLabel, MenuItem, FormControl, Select } from 'material-ui'
import Fa from 'src/constants/Fa'
import { BuildingTypes } from 'src/constants/HomeProperties'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class BuildingTypeSelect extends React.Component {
  state = {
    buildingType: ''
  }

  handleChange = event => {
    const { onBuildingTypeChange } = this.props
    this.setState({buildingType: event.target.value})
    onBuildingTypeChange(event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">{Fa["property type"]}</InputLabel>
          <Select
            value={this.state.buildingType}
            onChange={this.handleChange}
          >
            {BuildingTypes.map(buildingType =>
              <MenuItem value={buildingType}>{Fa[buildingType]}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    )
  }
}

BuildingTypeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BuildingTypeSelect)