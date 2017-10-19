import React, { Component } from 'react'
import Table from './Table.js'
import {
  Table as TableUI,
  Button,
  Header,
  Segment,
  Container
} from 'semantic-ui-react'
import axios from 'axios'

class AvailableTables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      availableTablesArray: []
    }
  }

  updateState (data) {
    this.setState({
      availableTablesArray: data
    })
  }

  componentWillMount () {
    const self = this
    axios({
      url: 'http://localhost:4741/tables_activities_all_available',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => self.updateState(response.data.tables_activities))
      .catch((error) => this.props.handleMessage('yellow', 'Login first!'))
  }

  render () {
    let body
    if (this.state.availableTablesArray.length > 0) {
      body = this.state.availableTablesArray.map((activity, index) => <Table
        table_id={activity.table_id}
        key={index}
        max_seat={activity.table.max_seat}
        min_seat={activity.table.min_seat}
        handleMessage={this.props.handleMessage}
        token={this.props.token}
      />)
    } else {
      body = <Header as='h2' floated='left'>Nothing Available Yet</Header>
    }
    return (
      <Container>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'>
            Available Tables
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
            {body}
          </TableUI.Body>
        </TableUI>
      </Container>
    )
  }
}

export default AvailableTables
