import React, { Component } from 'react'
import Fa from 'src/constants/Fa'
import 'src/styles/Header/Header.css'
import 'src/styles/UserInfoCard/UserInfoCard.css'


export default class ProfileAreaDropDown extends Component {
  render() {
    return (
      <div className="profileAreaDropDownContent curvedCorner" id={this.props.isHomePage ? "homePageProfileArea" : ""}>
        <div className="text userInfoCardUpperRow userInfoCardCommonRowProps">
          {Fa['Behnam Homayoun']}
        </div>
        <div className="userInfoCardMiddleRow userInfoCardCommonRowProps">
          <div className="text">{Fa['credit']}</div>
          <div className="text">{Fa['2000 Toumans']}</div>
        </div>
        <div className="userInfoCardLowerRow">
          <button className="userInfoCardBtn text curvedCorner">
            {Fa['increase credit']}
          </button>
        </div>
      </div>
    )
  }
}

// ProfileAreaDropDown.propTypes = {
//   isHomePage: PropTypes.bool
// };