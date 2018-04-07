import React, { Component } from 'react'
import Layout from 'src/components/general/Layout/Layout'
import Fa from 'src/constants/Fa'
import 'src/styles/AddCreditPage/AddCreditPage.css'
import 'src/styles/General.css'
import 'src/styles/text.css'


export default class AddCreditPage extends Component {
  render() {
    return (
      <Layout isHomePage={false}>
        <div className="addCreditContainer rtl">
          <div className="currentCreditBox">
            <div className="addCreditTxt greyTxt">
              {Fa['current credit']}
            </div>
            <div className="addCreditNumberTxt blackTxt">
              {Fa['20000']} {Fa['NBSP']}
            </div>
            <div className="addCreditTxt greyTxt">
              {Fa['Touman']}
            </div>
          </div>
          <form action="" className="addCreditBox">
            <div className="toumanTag addCreditSmallTxt greyTxt">
              {Fa['Touman']}
            </div>
            <input className="creditInput curvedCorner greyTxt" type="text" placeholder={Fa['amount to be added']}/>
              <button className="addCreditBtn curvedCorner">
                <p className="text addCreditBtnTxt">
                  {Fa['increase credit']}
                </p>
              </button>
          </form>
        </div>
      </Layout>
    )
  }
}