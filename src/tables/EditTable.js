import React, { Component } from 'react'
import {
  Table,
  Input,
  Button
} from 'semantic-ui-react'
import axios from 'axios'

class EditTable extends Component {
  constructor (props) {
    super (props)
    this.state = {
      max_seat: this.props.max_seat,
      min_seat: this.props.min_seat
    }
    this.editTable = this.editTable.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  editTable (event) {
    event.preventDefault()
    axios({
      url: `http://localhost:4741/tables/${this.props.table_id}`,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        table: {
          max_seat: this.state.max_seat,
          min_seat: this.state.min_seat,
          user_id: this.props.user_id
        }
      }
    })
      .then(() => this.props.callback())
      .then((response) => this.props._addNotification('success', 'Table Updated'))
      .then(this.props.onGetAllTables)
      .catch((error) => this.props._addNotification('info', 'Login first!'))
  }

  handleChange (event) {
    let attribute = event.target.name
    let value = event.target.value
    this.setState({
      [attribute]: value
    })
  }

  render () {
    return (
      <Table.Row>
        {/* Table Id can probably be edited? */}
        <Table.Cell>{this.props.table_id}</Table.Cell>
        <Table.Cell>
          <Input name='max_seat'
            placeholder='Max Guests'
            onChange={this.handleChange} value={this.state.max_seat} />
        </Table.Cell>
        <Table.Cell>
          <Input name='min_seat'
            placeholder='Minimum Guests' onChange={this.handleChange} value={this.state.min_seat}/>
        </Table.Cell>
        <Table.Cell>
          <Button basic
            color='teal'
            type='submit'
            content={`Edit Table ${this.props.table_id}`}
            onClick={(event) => this.editTable(event)}/>
        </Table.Cell>
        <Table.Cell>{'  '}</Table.Cell>
      </Table.Row>
    )
  }
}

export default EditTable
