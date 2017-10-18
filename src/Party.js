import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
  Table as TableUI,
  Button,
  Container
} from 'semantic-ui-react'
import Time from 'react-time-format'
import axios from 'axios'

import EditParty from './EditParty'
import SeatPartyForm from './SeatPartyForm'
import Table from './Table.js'
import MatchingTables from './MatchingTables.js'

class Party extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editParty: false,
      editPartyId: '',
      seatParty: false,
    }
    this.updatePartyState = this.updatePartyState.bind(this)
    this.getTablesMatchingPartySize = this.getTablesMatchingPartySize.bind(this)
    this.getAllOccupiedTables = this.getAllOccupiedTables.bind(this)
    this.showSeatPartyForm = this.showSeatPartyForm.bind(this)
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
      .then((response) => this.props.updateOccupiedTablesState(response.data.tables_activities))
      .then(() => this.props.filterOccupiedTablesToMatchParty())
      .catch((error) => console.log(error))
  }

  showSeatPartyForm () {
    this.setState({
      seatParty: !(this.state.seatParty)
    })
  }

  render () {
    if (this.state.editParty) {
      return <Route push to='/edit_parties' render={() => (
        <EditParty user_id={this.props.user_id}
          token={this.props.token}
          name={this.props.name}
          size={this.props.size}
          estWait={this.props.estWait}
          checkedIn={this.props.checkedIn}
          notes={this.props.notes}
          id={this.state.editPartyId}
          callback={this.updatePartyState}
          onGetAllParties={this.props.onGetAllParties}/>
      )}/>
    }

    let seatPartyForm
    if (this.state.seatParty) {
      seatPartyForm = <SeatPartyForm
        user_id={this.props.user_id}
        token={this.props.token}
        party_id={this.props.party_id}
      />
    }

    return (

      <TableUI.Row>
        <TableUI.Cell>{this.props.name}</TableUI.Cell>
        <TableUI.Cell>{this.props.size}</TableUI.Cell>
        <TableUI.Cell>{this.props.estWait}</TableUI.Cell>
        <TableUI.Cell><Time value={this.props.checkedIn} format='hh:mm'/></TableUI.Cell>
        <TableUI.Cell>{this.props.notes}</TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='yellow' onClick={(event) => this.setState({editParty:true, editPartyId:event.target.id})} id={this.props.party_id}>Edit</Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='red' onClick={(event) => this.props.onDeleteParty(event)} id={this.props.party_id}>Delete</Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='blue'
            onClick={(event) => this.getTablesMatchingPartySize(event)}
            as={Link} to='/matching_tables_to_party_size'
            id={this.props.party_id}>Match
          </Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='orange'
            onClick={(event) => this.getAllOccupiedTables(event)}
            as={Link} to='/next_available_tables_for_party'
            id={this.props.party_id}>Next Available
          </Button>
        </TableUI.Cell>
        <TableUI.Cell>
          {/* Pretty sure i don't need the link to */}
          <Button basic color='teal'
            onClick={(event) => this.showSeatPartyForm(event)}
            as={Link} to='########'
            id={this.props.party_id}>Seat
          </Button>
          {seatPartyForm}
        </TableUI.Cell>
      </TableUI.Row>
    )
  }
}

export default Party
