import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {
  Table as TableUI,
  Button,
  Header,
  Segment,
  Container
} from 'semantic-ui-react'
import axios from 'axios'

import Table from './Table.js'
import AddTable from './AddTable'

class AllTables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      // This state needs to be passed in as props, not updated on the spot
      tablesArray: []

    }
    this.getAllTables = this.getAllTables.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.deleteTable = this.deleteTable.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  updateState (data) {
    this.setState({
      tablesArray: data
    })
  }

  handleOnClick (event) {
    this.setState({
      [event.target.name]: true
    })
  }

  deleteTable (event) {
    event.preventDefault()
    const tableId = event.target.id
    axios({
      url: `http://localhost:4741/tables/${tableId}`,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then(() => this.getAllTables())
      .then((response) => this.props._addNotification('success', 'Table Removed From the Dining Area'))
      .catch((error) => this.props._addNotification('error', 'Unauthorized'))
  }

  getAllTables () {
    const self = this
    axios({
      url: `http://localhost:4741/users/${this.props.user_id}/tables`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => self.updateState(response.data.tables))
      .catch((error) => {
        console.log(error)
        this.props._addNotification('info', 'Login First')
      })
  }

  componentWillMount () {
    // State is updated with tables before mount
    this.getAllTables()
  }

  renderTables () {
    return this.state.tablesArray.map((table, index) => <Table
      table_id={table.id}
      key={index}
      max_seat={table.max_seat}
      min_seat={table.min_seat}
      _addNotification={this.props._addNotification}
      onDeleteTable={this.deleteTable}
      onGetAllTables={this.getAllTables}
      user_id={this.props.user_id}
      token={this.props.token}
    />)
  }

  render () {
    // ComponentWillMount gets called here
    // Render will finish execution with empty state
    // Realize state is updated
    // Then re-render, casuing the display bug
    if (this.state.addTable) {
      return <Route push to='/add_tables' render={() => (
        <AddTable user_id={this.props.user_id} token={this.props.token} _addNotification={this.props._addNotification}/>
      )}/>
    }

    let tablesOrMessage = this.renderTables()
    // TODO figure out why this conditional is causing display bug

    // if (this.state.tablesArray.length < 1) {
    //   tablesOrMessage = <Header as='h2' floated='left'>Dining Area has not been created</Header>
    // }

    return (
      <Container textAlign='center'>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'>
            Dining Room
          </Header>
          <Header as='h2' floated='right'>
            <Button basic color='teal' name='addTable' onClick={this.handleOnClick}>Add Table</Button>
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
            {tablesOrMessage}
          </TableUI.Body>
        </TableUI>
      </Container>
    )
  }
}

export default AllTables
