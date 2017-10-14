import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import { Table as TableUI } from 'semantic-ui-react'
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
      time_sat = <p>Time Sat: {this.props.time_sat}</p>
      time_up = <p>Time Up: {this.props.time_up}</p>
    }

    // Add same conditional for party/part_id

    return (

      <TableUI.Row>
        <TableUI.Cell>{this.props.id}</TableUI.Cell>
        <TableUI.Cell>{this.props.max_seat}</TableUI.Cell>
        <TableUI.Cell>{this.props.min_seat}</TableUI.Cell>
        <TableUI.Cell>
          <input onClick={(event) => this.setState({editTable:true, editTableId:event.target.id})} type='button' value='edit' id={this.props.id}/>
        </TableUI.Cell>
        <TableUI.Cell>
          <input onClick={(event) => this.props.onDeleteTable(event)} type='button' value='delete' id={this.props.id}/>
        </TableUI.Cell>
        <TableUI.Cell>{time_sat}</TableUI.Cell>
        <TableUI.Cell>{time_up}</TableUI.Cell>
      </TableUI.Row>
    )
  }

}

export default Table
