import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import {
  Container,
  Form,
  Header
} from 'semantic-ui-react'

class AddParty extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: '',
      size: '',
      estWait: '',
      timeIn: '',
      notes: '',
      addedParty: false,
    }
    this.createParty = this.createParty.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createParty (event) {
    event.preventDefault()
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
      .then((response) => this.props.handleMessage('green', 'Added ' + this.state.name + 'to the waitlist'))
      .then(() => this.setState({addedParty:true}))
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
    if (this.state.addedParty) {
      this.setState({addedParty:false})
      return <Redirect push to='/waitlist' />
    }
    return (
      <Container>
        <Header as='h2' content='Add a Party to the WaitList' />

        <Form onSubmit={this.createParty}>
          <Form.Input name='name' placeholder='name' onChange={this.handleChange} value={this.state.name} />

          <Form.Input name='size' placeholder='party size' onChange={this.handleChange} value={this.state.size} />

          <Form.Input name='estWait' placeholder='estimated wait' onChange={this.handleChange} value={this.state.estWait} />

          <Form.Input name='timeIn' placeholder='time checked in' onChange={this.handleChange} value={this.state.timeIn} />

          <Form.Input name='notes' placeholder='notes' onChange={this.handleChange} value={this.state.notes} />

          <Form.Button basic color='teal' type='submit' content='Add Party' />
        </Form>
      </Container>
    )
  }
}

export default AddParty
