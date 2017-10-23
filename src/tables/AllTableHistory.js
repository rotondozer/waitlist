import React, { Component } from 'react'
import axios from 'axios'
import {
  Table as TableUI,
  Button,
  Header,
  Segment,
  Container
} from 'semantic-ui-react'

import Table from './Table.js'

class AllTableHistory extends Component {
  constructor (props) {
    super (props)
    this.state = {
      allTableHistoryArray: []
    }
  }

  updateState (data) {
    this.setState({
      allTableHistoryArray: data
    })
  }

  componentWillMount () {
    const self = this
    axios({
      url: `https://waitlist-api.herokuapp.com/users/${this.props.user_id}/tables_activities`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => self.updateState(response.data.tables_activities))
      .catch((error) => this.props._addNotification('error', 'something went wrong'))
  }

  render () {
    const allTableHistory = this.state.allTableHistoryArray.map((activity, index) => <Table
      activity_id={activity.id}
      table_id={activity.table_id}
      key={index}
      max_seat={activity.table.max_seat}
      min_seat={activity.table.min_seat}
      history={true}
      time_sat={activity.time_sat}
      time_up={activity.time_up}
      user_id={this.props.user_id}
      token={this.props.token}
      _addNotification={this.props._addNotification}
    />)
    return (
      <Container>
        <Segment clearing raised size='large'>
          <Header as='h2' floated='left'>
            All Table History
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
              <TableUI.HeaderCell>Time Sat</TableUI.HeaderCell>
              <TableUI.HeaderCell>Time Up</TableUI.HeaderCell>
            </TableUI.Row>
          </TableUI.Header>

          <TableUI.Body>
            {allTableHistory}
          </TableUI.Body>
        </TableUI>
      </Container>
      // <div>
      //   <h1>ALL TABLE HISTORY</h1>
      //   {allTableHistory}
      // </div>
    )
  }
}

export default AllTableHistory
