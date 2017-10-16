import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import {
  Table as TableUI,
  Button
} from 'semantic-ui-react'
import axios from 'axios'

import EditParty from './EditParty'
import Table from './Table.js'

class Party extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editParty: false,
      editPartyId: '',
      showingTablesMatchingPartySize: false,
      matchingTablesArray: []
    }
    this.updatePartyState = this.updatePartyState.bind(this)
    this.getTablesMatchingPartySize = this.getTablesMatchingPartySize.bind(this)
  }

  updatePartyState () {
    this.setState({
      editParty: false
    })
  }

  updateMatchingTableState (data) {
    this.setState({
      showingTablesMatchingPartySize: !(this.state.showingTablesMatchingPartySize),
      matchingTablesArray: data
    })
  }

  // `this.props` will refer to each instance of a party.
  // this function is specific to each party
  getTablesMatchingPartySize (event) {
    const self = this
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables/' + this.props.size + '/match',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => {
        console.log(response.data.tables)
        self.updateMatchingTableState(response.data.tables)
      })
      .catch((error) => console.log(error))
  }

  render () {
    if (this.state.editParty) {
      return <Route push to='/edit_parties' render={() => (
        <EditParty user_id={this.props.user_id} token={this.props.token} id={this.state.editPartyId} callback={this.updatePartyState} onGetAllParties={this.props.onGetAllParties}/>
      )}/>
    }

    let matchingTables
    if (this.state.showingTablesMatchingPartySize) {
      matchingTables = this.state.matchingTablesArray.map((table, index) => <Table
        id={table.id}
        key={index}
        max_seat={table.max_seat}
        min_seat={table.min_seat}
        onDeleteTable={this.deleteTable}
        onGetAllTables={this.getAllTables}
        token={this.props.token}
      />)
    }
    return (

      <TableUI.Row>
        <TableUI.Cell>{this.props.name}</TableUI.Cell>
        <TableUI.Cell>{this.props.size}</TableUI.Cell>
        <TableUI.Cell>{this.props.estWait}</TableUI.Cell>
        <TableUI.Cell>{this.props.checkedIn}</TableUI.Cell>
        <TableUI.Cell>{this.props.notes}</TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='yellow' onClick={(event) => this.setState({editParty:true, editPartyId:event.target.id})} id={this.props.id}>Edit</Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='red' onClick={(event) => this.props.onDeleteTable(event)} id={this.props.id}>Delete</Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='blue' onClick={this.getTablesMatchingPartySize} id={this.props.id}>Match</Button>
        </TableUI.Cell>
        {/* Matching Tables needs to be its own component */}
        {matchingTables}
      </TableUI.Row>


    )
  }
}

export default Party
