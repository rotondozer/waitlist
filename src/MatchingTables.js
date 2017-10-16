import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Link } from 'react-router-dom'
import {
  Table as TableUI,
  Button
} from 'semantic-ui-react'
import axios from 'axios'

class MatchingTables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      matchingTablesArray: this.props.matchingTablesArray,
      test: 'test'
    }
  }

  // getTablesMatchingPartySize (event) {
  //   const self = this
  //   event.preventDefault()
  //   axios({
  //     url: 'http://localhost:4741/tables/' + this.props.size + '/match',
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': 'Token token=' + this.props.token
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response.data.tables)
  //       this.props.updateMatchingTableState(response.data.tables)
  //     })
  //     .catch((error) => console.log(error))
  // }


  render () {
    debugger
    return (
      <div>
        <h1>{this.props.matchingTablesArray[0].id}</h1>
        <h1>Test State {this.state.test}</h1>
      </div>
    )
  }
}

export default MatchingTables
