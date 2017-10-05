import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

class EditTable extends Component {
  constructor (props) {
    super (props)
    this.state = {
      max_seat: '',
      min_seat: ''
    }
    this.editTable = this.editTable.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  editTable (event) {
    console.log('edit table props ' + this.props)
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables/' + this.props.id,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        table: {
          max_seat: this.state.max_seat,
          min_seat: this.state.min_seat,
          // TODO: pass user_id down from container component
          user_id: 1
        }
      }
    })
      .then(() => this.props.callback())
      .then((response) => console.log(response))
      .then(this.props.onGetAllTables)
      .catch((error) => console.log(error))
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
      <div>
        <form onSubmit={this.editTable}>
          <h1>Edit Table Number {this.props.id}</h1>

          <input name='max_seat' placeholder='Max Guests' onChange={this.handleChange} value={this.state.max_seat}></input>

          <input name='min_seat' placeholder='Minimum Guests' onChange={this.handleChange} value={this.state.min_seat}></input>

          <button type='submit'>Edit Table {this.props.id}</button>
        </form>
      </div>
    )
  }
}

export default EditTable
