import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import {
  Table as TableUI,
  Button
} from 'semantic-ui-react'

class EnterTimeUp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activity_id: this.props.activity_id,
      table_id: this.props.table_id,
      time_sat: this.props.time_sat
    }
  }

  submitTimeUp (event) {
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables_activities/' + this.state.activity_id,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        tables_activity: {
          table_id: this.state.table_id,
          min_seat: this.state.min_seat,
          // TODO: pass user_id down from container component
          user_id: this.props.user_id
        }
      }
    })
  }

  render () {
    return (
      <TableUI.Row>
        <TableUI.Cell>{this.props.table_id}</TableUI.Cell>
        <TableUI.Cell>max</TableUI.Cell>
        <TableUI.Cell>min</TableUI.Cell>
        <TableUI.Cell>edit</TableUI.Cell>
        <TableUI.Cell>delete</TableUI.Cell>
        <TableUI.Cell>{this.props.time_sat}</TableUI.Cell>
        <TableUI.Cell>
          {/* TODO capture onChange within state, send that with submit form */}
          <input placeholder='enter time up'></input>
        </TableUI.Cell>

      </TableUI.Row>
    )
  }
}

export default EnterTimeUp
