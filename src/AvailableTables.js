import React, { Component } from 'react'
import Table from './Table.js'
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
      .then((response) => {
        console.log(response.data.tables_activities)
        self.updateState(response.data.tables_activities)
      })
      .catch((error) => console.log(error))
  }

  render () {
    if (this.state.availableTablesArray.length > 0) {
      const availableTables = this.state.availableTablesArray.map((activity, index) => <Table
        id={activity.table_id}
        key={index}
        max_seat={activity.table.max_seat}
        min_seat={activity.table.min_seat}

        token={this.props.token}
      />)
      return (
        <div>
          <h1>AVAILABLE TABLES</h1>
          {availableTables}
        </div>
      )
    } else {
      return (
        <div>
          <h1>AVAILABLE TABLES</h1>
          <p>No available tables</p>
        </div>
      )
    }
  }
}

export default AvailableTables
