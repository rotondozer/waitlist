import React, { Component } from 'react'
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
    return (
      <h1>AVAILABLE TABLES</h1>
    )
  }
}

export default AvailableTables
