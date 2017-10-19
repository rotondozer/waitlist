import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'
import {
  Table as TableUI,
  Button,
  Header,
  Segment,
  Container
} from 'semantic-ui-react'
import axios from 'axios'

import MatchingTables from './MatchingTables.js'
import NextAvailableTables from './NextAvailableTables.js'
import Party from './Party.js'

class Waitlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      partiesArray: [],
      // TODO use this to store the party which the 'Match' button was clicked
      // event.target.id? same as deleteParty()
      activeParty: '',
      showingTablesMatchingPartySize: false,
      matchingTablesArray: [],
      showingNextAvailableTables: false,
      occupiedTablesArray: [],
      // THIS is where NextAvailableTables will be fed from ...
      nextAvailableTables: []
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.deleteParty = this.deleteParty.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.getAllParties = this.getAllParties.bind(this)
    this.getAllOccupiedTables = this.getAllOccupiedTables.bind(this)
    this.updateMatchingTableState = this.updateMatchingTableState.bind(this)
    this.updateOccupiedTablesState = this.updateOccupiedTablesState.bind(this)
    this.filterOccupiedTablesToMatchParty = this.filterOccupiedTablesToMatchParty.bind(this)
    this.updateNextAvailableTablesState = this.updateNextAvailableTablesState.bind(this)
  }

  // TODO consolidate the update state functions to be dynamic
  updateState (data) {
    this.setState({
      partiesArray: data
    })
  }

  updateOccupiedTablesState (data) {
    this.setState({

      occupiedTablesArray: data
    })
    // this.filterOccupiedTablesToMatchParty()
  }

  updateNextAvailableTablesState (tables) {
    this.setState({
      nextAvailableTables: tables,
      showingNextAvailableTables: !(this.state.showingNextAvailableTables)
    })

  }

  updateMatchingTableState (data) {
    this.setState({
      showingTablesMatchingPartySize: !(this.state.showingTablesMatchingPartySize),
      matchingTablesArray: data
      // TODO update user here, if needed
      // activeParty: user
    })
  }

  filterOccupiedTablesToMatchParty () {
    const matching = this.state.matchingTablesArray
    const occupied = this.state.occupiedTablesArray
    let nextAvail = []

    matching.forEach(function (matchingTable) {
      occupied.forEach(function (occupiedTable) {
        if (occupiedTable.table_id === matchingTable.id) {
          nextAvail.push(occupiedTable)
        }
      })
    })
    // On first click, this function is given an empty array
    // On the first click, occupied is there and matching is not
    // It should help that these two updates are in the same place, so one can't happen without the other
    this.updateNextAvailableTablesState(nextAvail)
  }

  handleOnClick (event) {
    this.setState({
      [event.target.name]: true
    })
  }

  deleteParty (event) {
    const baseUrl = 'http://localhost:4741'
    const partyId = event.target.id
    event.preventDefault()
    axios({
      url: `${baseUrl}/parties/${partyId}`,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then(() => this.getAllParties())
      .then((response) => this.props.handleMessage('good'))
      .catch((error) => this.props.handleMessage('bad'))
  }

  getAllParties () {
    const baseUrl = 'http://localhost:4741'
    const self = this
    axios({
      url: baseUrl + '/parties',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => {
        self.updateState(response.data.parties)
        this.props.handleMessage('good')
      })
      .catch((error) => this.props.handleMessage('bad'))
  }

  getAllOccupiedTables () {
    // event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables_activities_all_occupied',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => {
        this.updateOccupiedTablesState(response.data.tables_activities)
        this.props.handleMessage('good')
      })
      .catch((error) => this.props.handleMessage('bad'))
  }
  componentWillMount () {
    this.getAllParties()
    this.getAllOccupiedTables()
  }

  render () {
    if (this.state.addParty) {
      return <Redirect push to="/add_parties" />
    }

    let matchingTables
    if (this.state.showingTablesMatchingPartySize) {
      matchingTables = <Route to='/matching_tables_to_party_size' render={() => (
        <MatchingTables
          user_id={this.props.user_id}
          token={this.props.token}
          matchingTablesArray={this.state.matchingTablesArray}
          updateMatchingTableState={this.updateMatchingTableState}
          handleMessage={this.props.handleMessage}
        />
      )} />
    }

    let nextAvailableTables
    if (this.state.showingNextAvailableTables) {
      // this is being flipped to true before it has the updated state to feed
      nextAvailableTables = <Route to='/next_available_tables_for_party' render={() => (
        <NextAvailableTables
          nextAvailableTables={this.state.nextAvailableTables}
          handleMessage={this.props.handleMessage}
        />
      )} />
    }

    let partiesOrMessage
    if (this.state.partiesArray.length > 0) {
      partiesOrMessage = this.state.partiesArray.map((party, index) => <Party
        name={party.name}
        size={party.size}
        estWait={party.est_wait}
        checkedIn={party.checked_in}
        notes={party.notes}
        key={index}
        party_id={party.id}
        onDeleteParty={this.deleteParty}
        onGetAllParties={this.getAllParties}
        updateMatchingTableState={this.updateMatchingTableState}
        updateOccupiedTablesState={this.updateOccupiedTablesState}
        filterOccupiedTablesToMatchParty={this.filterOccupiedTablesToMatchParty}
        handleMessage={this.props.handleMessage}
        token={this.props.token}
      />)
    } else {
      partiesOrMessage = <Header as='h2' floated='left'>No Parties Waiting</Header>
    }
    return (
      <Container>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'  content='Guests Waiting' subheader="Click 'Match' first, then 'Next Available'" />

          <Header as='h2' floated='right'>
            <Button basic color='teal' name='addParty' onClick={this.handleOnClick}>Add Party</Button>
          </Header>
        </Segment>

        <TableUI celled>
          <TableUI.Header>
            <TableUI.Row>
              <TableUI.HeaderCell>Name</TableUI.HeaderCell>
              <TableUI.HeaderCell>Size</TableUI.HeaderCell>
              <TableUI.HeaderCell>Est. Wait</TableUI.HeaderCell>
              <TableUI.HeaderCell>Time Checked In</TableUI.HeaderCell>
              <TableUI.HeaderCell>Notes</TableUI.HeaderCell>
              <TableUI.HeaderCell>Edit</TableUI.HeaderCell>
              <TableUI.HeaderCell>Delete</TableUI.HeaderCell>
              <TableUI.HeaderCell>Matching Tables</TableUI.HeaderCell>
              <TableUI.HeaderCell>Next Available Tables</TableUI.HeaderCell>
              <TableUI.HeaderCell>Seat Party</TableUI.HeaderCell>
            </TableUI.Row>
          </TableUI.Header>

          <TableUI.Body>
            {/* TODO move message display to central location*/}
            {partiesOrMessage}
          </TableUI.Body>
        </TableUI>
        {matchingTables}
        {nextAvailableTables}
      </Container>
    )
  }
}

export default Waitlist
