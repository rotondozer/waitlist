import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class AddTable extends Component {
  constructor (props) {
    super (props)
    this.state = {
      max_seat: '',
      min_seat: '',
      addedTable: false
    }
    this.createTable = this.createTable.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createTable (event) {
    event.preventDefault()
    console.log(this.state)
    axios({
      url: 'https://waitlist-api.herokuapp.com/tables',
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
      .then((response) => console.log(response))
      .then(() => this.setState({addedTable:true}))
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
    if (this.state.addedTable) {
      this.setState({addedTable:false})
      return <Redirect push to='/tables'/>
    }
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
