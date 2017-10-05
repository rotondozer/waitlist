import React, { Component } from 'react'
import axios from 'axios'

class AddParty extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: '',
      size: '',
      estWait: '',
      timeIn: '',
      notes: ''
    }
    this.createParty = this.createParty.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createParty (event) {
    event.preventDefault()
    console.log(this.state)
    axios({
      url: 'http://localhost:4741/parties',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        party: {
          name: this.state.name,
          size: this.state.size,
          checked_in: this.state.timeIn,
          est_wait: this.state.estWait,
          notes: this.state.notes,
          // TODO: pass user_id down from container component
          user_id: this.props.user_id
        }
      }
    })
      .then(() => this.getAllParties())
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
        <form onSubmit={this.createParty}>
          <h1>Add a Party to the WaitList</h1>
          <input name='name' placeholder='name' onChange={this.handleChange} value={this.state.name}></input>
          <input name='size' placeholder='party size' onChange={this.handleChange} value={this.state.size}></input>
          <input name='estWait' placeholder='estimated wait' onChange={this.handleChange} value={this.state.estWait}></input>
          <input name='timeIn' placeholder='time checked in' onChange={this.handleChange} value={this.state.timeIn}></input>
          <input name='notes' placeholder='notes' onChange={this.handleChange} value={this.state.notes}></input>

          <button type='submit'>Add Party</button>
        </form>
      </div>
    )
  }
}

export default AddParty
