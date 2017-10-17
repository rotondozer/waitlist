import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import {
  Table as TableUI,
  Button
} from 'semantic-ui-react'
import EditTable from './EditTable'

class Table extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editTable: false,
      editTableId: ''
    }
    this.updateTableState = this.updateTableState.bind(this)
  }

  updateTableState () {
    this.setState({
      editTable: false
    })
  }

  render () {
    if (this.state.editTable) {
      return <Route push to='/edit_tables' render={() => (
        <EditTable id={this.state.editTableId}
          callback={this.updateTableState}
          onGetAllTables={this.props.onGetAllTables}
          token={this.props.token} />
      )}/>
    }
    let time_sat, time_up
    if (this.props.history) {
      time_sat = <TableUI.Cell>{this.props.time_sat}</TableUI.Cell>
      if (this.props.time_up === null) {
        // Make the time-up cell a button to PATCH tables_activities and enter time up.
        time_up = <TableUI.Cell><Button basic color='teal' id={this.props.id}>They're Up!</Button></TableUI.Cell>
        // Either send the form pre-filled with infomation
        // or edit controller to not update blank fields
      } else {
        time_up = <TableUI.Cell>{this.props.time_up}</TableUI.Cell>
      }

    }

    // Add same conditional for party/part_id

    return (

      <TableUI.Row>
        <TableUI.Cell>{this.props.id}</TableUI.Cell>
        <TableUI.Cell>{this.props.max_seat}</TableUI.Cell>
        <TableUI.Cell>{this.props.min_seat}</TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='yellow' onClick={(event) => this.setState({editTable:true, editTableId:event.target.id})} id={this.props.id}>Edit</Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='red' onClick={(event) => this.props.onDeleteTable(event)} id={this.props.id}>Delete</Button>
        </TableUI.Cell>
        {time_sat}
        {time_up}
      </TableUI.Row>
    )
  }

}

export default Table
