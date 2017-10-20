import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Link } from 'react-router-dom'
import {
  Table as TableUI,
  Button,
  Container,
  Segment,
  Header
} from 'semantic-ui-react'
import axios from 'axios'

import Table from '../tables/Table.js'
// ** This Component needs to serve the same purpose as MatchingTables
// ** Tables returned should be 'Matching Tables'
// ** That are also unavailable
// ** With time sat visible
// ** Table columns should be normal (num, max, min, time_sat)
// ** Each row should contain a different table with the most recent time sat
class NextAvailableTables extends Component {
  render () {
    // the max_seat prop is used her to re-use the table component
    const nextAvailableTables = this.props.nextAvailableTables.map((table, index) => <Table
      table_id={table.table_id}

      max_seat={table.time_sat}
      key={index}
    />)

    return (
      <Container>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'>
            Next Available Tables for this Party
          </Header>

        </Segment>
        <TableUI celled>
          <TableUI.Header>
            <TableUI.Row>
              <TableUI.HeaderCell>Number</TableUI.HeaderCell>
              <TableUI.HeaderCell>Time Sat</TableUI.HeaderCell>
              <TableUI.HeaderCell>Time Up</TableUI.HeaderCell>
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
