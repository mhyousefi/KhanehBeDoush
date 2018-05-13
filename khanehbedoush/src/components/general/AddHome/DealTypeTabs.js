import { AppBar, Button, Tab, Tabs, Typography, withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import { AddHomeAPI } from 'src/api/AddHomeAPI'
import Fa from 'src/constants/Fa'
import { messages } from 'src/constants/FaTexts'
import { DealTypes } from 'src/constants/HomeProperties'
import 'src/styles/General.css'
import BuildingTypeSelect from './BuildingTypeSelect'
import GeneralInfoSelect from './GeneralInfoSelect'
import PriceInfoSelect from './PriceInfoSelect'

function TabContainer (props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.paper,
  },
})

class DealTypeTabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      dealType: 'rental',
      buildingType: '',
      area: '',
      phoneNumber: '',
      address: '',
      basePrice: '',
      rentPrice: '',
      sellingPrice: '',
    }
  }

  handleTabChange = (event, value) => {
    this.setState({tabIndex: value})
    let newDealType = (value === 0) ? 'rental' : 'sale'
    this.setState({dealType: newDealType})
  }

  handleBuildingTypeChange = (newBuildingType) => {
    this.setState({buildingType: newBuildingType})
  }

  handleAreaChange = (newArea) => {
    this.setState({area: newArea})
  }

  handlePhoneNumberChange = (newPhoneNumber) => {
    this.setState({phoneNumber: newPhoneNumber})
  }

  handleAddressChange = (newAddress) => {
    this.setState({address: newAddress})
  }

  handleBasePriceChange = (newBasePrice) => {
    this.setState({basePrice: newBasePrice})
  }

  handleRentPriceChange = (newRentPrice) => {
    this.setState({rentPrice: newRentPrice})
  }

  handleSellingPriceChange = (newSellingPrice) => {
    this.setState({sellingPrice: newSellingPrice})
  }

  sendHouseToServer = () => {
    const {user} = this.props
    const {dealType, buildingType, area, phoneNumber, address, basePrice, rentPrice, sellingPrice} = this.state
    let newHouse = {
      'dealType': dealType,
      'buildingType': buildingType,
      'area': area,
      'phoneNumber': phoneNumber,
      'address': ('//' + address),
      'basePrice': basePrice,
      'rentPrice': rentPrice,
      'sellingPrice': sellingPrice,
    }

    if (true) {
      AddHomeAPI(user, newHouse).then((response) => {
        if (response === 'wrong input') {
          alert(messages['wrong inputs'])
        } else if (response === 'server error') {
          alert(messages['server error'])
        } else if (response === true) {
          alert(messages['home added'])
        }
      })
    } else {
      alert(messages['wrong inputs'])
    }
  }

  render () {
    const {tabIndex} = this.state
    return (
      <div className="fullWidth">
        <AppBar position="static">
          <Tabs centered fullWidth value={tabIndex} onChange={this.handleTabChange}>
            <Tab label={Fa[DealTypes[0]]}/>
            <Tab label={Fa[DealTypes[1]]}/>
          </Tabs>
        </AppBar>
        <div className="flexRow center">
          <GeneralInfoSelect
            onAreaChange={this.handleAreaChange}
            onPhoneNumberChange={this.handlePhoneNumberChange}
            onAddressChange={this.handleAddressChange}
          />
        </div>
        <div className="flexRow center">
          <PriceInfoSelect
            dealType={DealTypes[this.state.tabIndex]}
            onBasePriceChange={this.handleBasePriceChange}
            onRentPriceChange={this.handleRentPriceChange}
            onSellingPriceChange={this.handleSellingPriceChange}
          />
        </div>
        <div className="center">
          <BuildingTypeSelect
            onBuildingTypeChange={this.handleBuildingTypeChange}
          />
        </div>
        <br/>
        <div className="center">
          <Button color='secondary' className="btnMedium" onClick={this.sendHouseToServer}>
            {Fa['send data']}
          </Button>
        </div>
      </div>
    )
  }
}

DealTypeTabs.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DealTypeTabs)