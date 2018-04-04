import React, { Component } from 'react'

export default class HomePageAdBoxContainer extends Component {
    render(){
        return(
            <div className="homePageAdBoxContainer">
                <div className="homePageAdBox curvedCorner">
                    <img className="homePageAdBoxImage" src="../../../assets/images/icons/726446.svg"/>
                    <div className="homePageAdBoxTxtArea">
                        <div className="homePageAdBoxTitle">
                            آسان
                        </div>
                        <div className="homePageAdBoxTxt">
                            به سادگی صاحب خانه شوید
                        </div>
                    </div>
                </div>
                <div className="homePageAdBox curvedCorner">
                    <img className="homePageAdBoxImage" src="../../../assets/images/icons/726488.svg"/>
                    <div className="homePageAdBoxTxtArea">
                        <div className="homePageAdBoxTitle">
                            مطمئن
                        </div>
                        <div className="homePageAdBoxTxt">
                            با خیال راحت به دنبال خانه بگیردید
                        </div>
                    </div>
                </div>
                <div className="homePageAdBox curvedCorner">
                    <img className="homePageAdBoxImage" src="../../../assets/images/icons/726499.svg"/>
                    <div className="homePageAdBoxTxtArea">
                        <div className="homePageAdBoxTitle">
                            گسترده
                        </div>
                        <div className="homePageAdBoxTxt">
                            در منطقه مورد علاقه خود صاحب خانه شوید
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}