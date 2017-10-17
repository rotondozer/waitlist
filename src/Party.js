import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
  Table as TableUI,
  Button,
  Container
} from 'semantic-ui-react'
import axios from 'axios'

import EditParty from './EditParty'
import Table from './Table.js'
import MatchingTables from './MatchingTables.js'

class Party extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editParty: false,
      editPartyId: ''
    }
    this.updatePartyState = this.updatePartyState.bind(this)
    this.getTablesMatchingPartySize = this.getTablesMatchingPartySize.bind(this)
    // this.getNextAvailableTables = this.getNextAvailableTables.bind(this)
    this.getAllOccupiedTables = this.getAllOccupiedTables.bind(this)
  }

  updatePartyState () {
    this.setState({
      editParty: false
    })
  }

  // *** `this.props` will refer to each instance of a party. ***
  // this function is specific to each party
  getTablesMatchingPartySize (event) {
    event.preventDefault()

    axios({
      url: 'http://localhost:4741/tables/' + this.props.size + '/match',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => this.props.updateMatchingTableState(response.data.tables))
      .catch((error) => console.log(error))
  }

  // *** `this.props` will refer to each instance of a party. ***
  // this function is specific to each party
  getAllOccupiedTables (event) {
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables_activities_all_occupied',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => {
        console.log('All Occupied Tables = ', response.data.tables_activities)
        this.props.updateOccupiedTablesState(response.data.tables_activities)
      })
      .then(() => this.props.filterOccupiedTablesToMatchParty())
      .catch((error) => console.log(error))
  }

  // getNextAvailableTables (event) {
  //   event.preventDefault()
  //
  //   this.getTablesMatchingPartySize(event)
  //
  //   this.props.filterOccupiedTablesToMatchParty()
  // }

  render () {
    if (this.state.editParty) {
      return <Route push to='/edit_parties' render={() => (
        <EditParty user_id={this.props.user_id} token={this.props.token} id={this.state.editPartyId} callback={this.updatePartyState} onGetAllParties={this.props.onGetAllParties}/>
      )}/>
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
          <Button basic color='blue'
            onClick={(event) => this.getTablesMatchingPartySize(event)}
            as={Link} to='/matching_tables_to_party_size'
            id={this.props.id}>Match
          </Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='orange'
            onClick={(event) => this.getAllOccupiedTables(event)}
            as={Link} to='/next_available_tables_for_party'
            id={this.props.id}>Next Available
          </Button>
        </TableUI.Cell>
      </TableUI.Row>

    )
  }
}

export default Party
