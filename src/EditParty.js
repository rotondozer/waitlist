import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

class EditParty extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: '',
      size: '',
      estWait: '',
      timeIn: '',
      notes: ''
    }
    this.editParty = this.editParty.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  editParty (event) {
    event.preventDefault()
    axios({
      url: 'https://waitlist-api.herokuapp.com/parties/' + this.props.id,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        party: {
          name: this.state.name,
          size: this.state.size,
          checked_in: this.state.timeIn,
          est_wait: this.state.estWait,
          notes: this.state.notes,
          // TODO: pass user_id down from container component
          user_id: 1
        }
      }
    })
      .then(() => this.props.callback())
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
        <form onSubmit={this.editParty}>
          <h1>Edit this Party</h1>
          <input name='name' placeholder='name' onChange={this.handleChange} value={this.state.name}></input>
          <input name='size' placeholder='party size' onChange={this.handleChange} value={this.state.size}></input>
          <input name='estWait' placeholder='estimated wait' onChange={this.handleChange} value={this.state.estWait}></input>
          <input name='timeIn' placeholder='time checked in' onChange={this.handleChange} value={this.state.timeIn}></input>
          <input name='notes' placeholder='notes' onChange={this.handleChange} value={this.state.notes}></input>

          <button type='submit'>Edit Party</button>
        </form>
      </div>
    )
  }
}

export default EditParty
