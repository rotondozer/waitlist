import React, { Component } from 'react'
import { Redirect } from 'react-router'
import {
  Form,
  Container,
  Header
} from 'semantic-ui-react'
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
      url: 'http://localhost:4741/parties/' + this.props.id,
      method: 'PATCH',
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
          user_id: 1
        }
      }
    })
      .then(() => this.props.callback())
      .then((response) => console.log(response))
      .then(this.props.onGetAllParties)
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
      <Container>

        <Form onSubmit={this.editParty}>
          <Form.Group>
            <Header as='h4' content='Edit this Party' />
            <Form.Input name='name'
              placeholder='name'
              onChange={this.handleChange}
              value={this.state.name} />
            <Form.Input name='size'
              placeholder='party size'
              onChange={this.handleChange}
              value={this.state.size} />
            <Form.Input name='estWait'
              placeholder='estimated wait'
              onChange={this.handleChange}
              value={this.state.estWait} />
            <Form.Input name='timeIn'
              placeholder='time checked in'
              onChange={this.handleChange}
              value={this.state.timeIn} />
            <Form.Input name='notes'
              placeholder='notes'
              onChange={this.handleChange}
              value={this.state.notes} />

            <Form.Button basic color='teal' type='submit' content='Edit Party' />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default EditParty
