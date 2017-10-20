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

class MatchingTables extends Component {
  render () {
    const matchingTables = this.props.matchingTablesArray.map((table, index) => <Table
      table_id={table.id}
      max_seat={table.max_seat}
      min_seat={table.min_seat}
      key={index}
      _addNotification={this.props._addNotification}
    />)

    return (
      <Container>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'>
            Matching Tables
          </Header>
        </Segment>
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
