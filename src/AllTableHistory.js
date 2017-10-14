import React, { Component } from 'react'
import axios from 'axios'

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
      url: 'http://localhost:4741/tables_activities',
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
    const allTableHistory = this.state.allTableHistoryArray.map((activity, index) => <Table
      id={activity.table_id}
      key={index}
      max_seat={activity.table.max_seat}
      min_seat={activity.table.min_seat}
      history={true}
      time_sat={activity.time_sat}
      time_up={activity.time_up}

      token={this.props.token}
    />)
    return (
      <div>
        <h1>ALL TABLE HISTORY</h1>
        {allTableHistory}
      </div>
    )
  }
}

export default AllTableHistory
