import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Link } from 'react-router-dom'
import {
  Table as TableUI,
  Button,
  Container
} from 'semantic-ui-react'
import axios from 'axios'

import Table from './Table.js'

class MatchingTables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      // TODO get rid of state altogether and render based off props
      // Use a FUNCTIONAL COMPONENT
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

    const matchingTables = this.props.matchingTablesArray.map((table, index) => <Table
      id={table.id}
      max_seat={table.max_seat}
      min_seat={table.min_seat}
      key={index}

    />)

    return (
      <Container>
        <TableUI celled>
          <TableUI.Header>
            <TableUI.Row>
              <TableUI.HeaderCell>Number</TableUI.HeaderCell>
              <TableUI.HeaderCell>Max Guests</TableUI.HeaderCell>
              <TableUI.HeaderCell>Min Guests</TableUI.HeaderCell>
              <TableUI.HeaderCell>Edit</TableUI.HeaderCell>
              <TableUI.HeaderCell>Delete</TableUI.HeaderCell>
            </TableUI.Row>
          </TableUI.Header>

          <TableUI.Body>
            {matchingTables}
          </TableUI.Body>
        </TableUI>
      </Container>

    )
  }
}

export default MatchingTables
