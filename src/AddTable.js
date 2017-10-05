import React, { Component } from 'react'
import axios from 'axios'

class AddTable extends Component {
  constructor (props) {
    super (props)
    this.state = {
      max_seat: '',
      min_seat: ''
    }
    this.createTable = this.createTable.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createTable (event) {
    event.preventDefault()
    console.log(this.state)
    axios({
      url: 'http://localhost:4741/tables',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        table: {
          max_seat: this.state.max_seat,
          min_seat: this.state.min_seat,
          // TODO: pass user_id down from container component
          user_id: this.props.user_id
        }
      }
    })
      .then(() => this.getAllTables())
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      {/*PLACE USER MESSAGE HERE*/}
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
        <form onSubmit={this.createTable}>
          <h1>Add a Table to the Dining Area</h1>

          <input name='max_seat' placeholder='Max Guests' onChange={this.handleChange} value={this.state.max_seat}></input>

          <input name='min_seat' placeholder='Minimum Guests' onChange={this.handleChange} value={this.state.min_seat}></input>

          <button type='submit'>Add Table</button>
        </form>
      </div>
    )
  }
}

export default AddTable
