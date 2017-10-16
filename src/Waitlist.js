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
      matchingTablesArray: []
      // showingTablesMatchingPartySize: false
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.deleteParty = this.deleteParty.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.getAllParties = this.getAllParties.bind(this)
    this.updateMatchingTableState = this.updateMatchingTableState.bind(this)
  }

  updateState (data) {
    this.setState({
      partiesArray: data
    })
  }

  updateMatchingTableState (data) {
    // being called
    this.setState({
      showingTablesMatchingPartySize: !(this.state.showingTablesMatchingPartySize),
      matchingTablesArray: data
      // TODO update user here, if needed
      // activeParty: user
    })
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
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
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
        console.log(response.data.parties)
        self.updateState(response.data.parties)
      })
      .catch((error) => console.log(error))
  }

  componentWillMount () {
    this.getAllParties()
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

        />
      )} />
    }

    let nextAvailableTables
    if (this.state.showingNextAvailableTables) {
      nextAvailableTables = <Route to='/next_available_tables_for_party' render={() => (
        <NextAvailableTables
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
        id={party.id}
        onDeleteProp={this.deleteParty}
        onGetAllParties={this.getAllParties}
        updateMatchingTableState={this.updateMatchingTableState}
        token={this.props.token}
      />)
    } else {
      partiesOrMessage = <Header as='h2' floated='left'>No Parties Waiting</Header>
    }
    return (
      <Container textAlign='center'>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'>
            Guests Waiting
          </Header>
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
            </TableUI.Row>
          </TableUI.Header>

          <TableUI.Body>
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
