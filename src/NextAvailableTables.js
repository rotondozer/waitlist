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
// ** This Component needs to serve the same purpose as MatchingTables
// ** Tables returned should be 'Matching Tables'
// ** That are also unavailable
// ** With time sat visible
// ** Table columns should be normal (num, max, min, time_sat)
// ** Each row should contain a different table with the most recent time sat
class NextAvailableTables extends Component {
  render () {
    // probably won't be matching tables array
    const nextAvailableTables = this.props.nextAvailableTables.map((table, index) => <Table
      id={table.id}
      max_seat={table.max_seat}
      min_seat={table.min_seat}
      time_sat={table.time_sat}
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
            {nextAvailableTables}
          </TableUI.Body>
        </TableUI>
      </Container>
    )
  }
}

export default NextAvailableTables
