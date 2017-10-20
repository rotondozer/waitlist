import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import {
  Table as TableUI,
  Button
} from 'semantic-ui-react'

import EnterTimeUp from './EnterTimeUp'
import EditTable from './EditTable'

class Table extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editTable: false,
      enterTimeUp: false,
      time_sat: '',
      activity_id: '',
    }
    this.updateTableState = this.updateTableState.bind(this)
    this.enterTimeUpSwitch = this.enterTimeUpSwitch.bind(this)
  }

  updateTableState () {
    this.setState({
      editTable: !(this.state.editTable)
    })
  }

  // This function is called before redirecting to form to enterTimeUp
  enterTimeUpSwitch (event) {
    this.setState({
      enterTimeUp: !(this.state.enterTimeUp),
      // is 'Buton id == table_id' originally passed,
      editTableId: event.target.getAttribute('table_id'),
      time_sat: event.target.getAttribute('time_sat'),
      activity_id: event.target.getAttribute('activity_id')
    })
  }

  render () {
    if (this.state.editTable) {
      return <Route push to='/edit_tables' render={() => (
        <EditTable user_id={this.props.user_id}
          token={this.props.token}
          table_id={this.props.table_id}
          max_seat={this.props.max_seat}
          min_seat={this.props.min_seat}
          _addNotification={this.props._addNotification}
          callback={this.updateTableState}
          onGetAllTables={this.props.onGetAllTables}
        />
      )}/>
    }
    if (this.state.enterTimeUp) {
      return <Route push to='/enter_time_up' render={() => (
        <EnterTimeUp table_id={this.props.table_id}
          activity_id={this.state.activity_id}
          time_sat={this.state.time_sat}
          _addNotification={this.props._addNotification}
          user_id={this.props.user_id}
          token={this.props.token}
        />
      )}/>
    }
    let time_sat, time_up
    if (this.props.history) {
      time_sat = <TableUI.Cell>{this.props.time_sat}</TableUI.Cell>
      if (this.props.time_up === null) {
        // Each button contains props unique to that tables_activity
        // onClick update state with the unique values
        time_up = <TableUI.Cell>
          <Button basic color='teal'
            activity_id={this.props.activity_id}
            table_id={this.props.table_id}
            time_sat={this.props.time_sat}
            onClick={(event) => this.enterTimeUpSwitch(event)}>They're Up!
          </Button>
        </TableUI.Cell>
        // Either send the form pre-filled with infomation
        // or edit controller to not update blank fields
      } else {
        time_up = <TableUI.Cell>{this.props.time_up}</TableUI.Cell>
      }
    }

    // TODO ? Add same conditional for party/part_id

    return (
      <TableUI.Row>
        <TableUI.Cell>{this.props.table_id}</TableUI.Cell>
        <TableUI.Cell>{this.props.max_seat}</TableUI.Cell>
        <TableUI.Cell>{this.props.min_seat}</TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='yellow' onClick={(event) => this.setState({editTable:true, editTableId:event.target.id})} id={this.props.table_id}>Edit</Button>
        </TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='red' onClick={(event) => this.props.onDeleteTable(event)} id={this.props.table_id}>Delete</Button>
        </TableUI.Cell>
        {time_sat}
        {time_up}
      </TableUI.Row>
    )
  }
}

export default Table
