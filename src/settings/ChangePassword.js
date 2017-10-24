import React, { Component } from 'react'
import { Redirect } from 'react-router'
import {
  Form,
  Container,
  Header,
  Segment
} from 'semantic-ui-react'
import axios from 'axios'

// ChangePassword does not actually need email?
class ChangePassword extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      old_password: '',
      new_password: '',
      changePassword: false
    }
    this.changePassword = this.changePassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSuccessUpdateState = this.onSuccessUpdateState.bind(this)
  }

  handleChange (event) {
    let attribute = event.target.name
    let value = event.target.value
    this.setState({
      [attribute]: value
    })
  }

  onSuccessUpdateState () {
    this.setState({
      email: '',
      old_password: '',
      new_password: '',
      changePassword: true
    })
  }

  changePassword (event) {
    const self = this
    event.preventDefault()
    axios({
      url: 'https://waitlist-api.herokuapp.com/change-password/' + self.props.user_id,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + self.props.token
      },
      data: {
        'passwords': {
          // 'email': self.state.email,
          'old': self.state.old_password,
          'new': self.state.new_password
        }
      }
    })
      .then((response) => this.props._addNotification('success', 'Password Updated!'))
      .then(this.onSuccessUpdateState)
      .catch((error) => this.props._addNotification('error', 'something went wrong'))
  }


  render () {
    if (this.state.changePassword) {
      this.setState({changePassword: false})
      return <Redirect push to='/' />
    }
    return (
      <Container>
        <Segment clearing raised size='large'>
          <Header as='h2' content='Change Password'/>
        </Segment>
        <Form onSubmit={this.changePassword}>
          <Form.Input
            name='email'
            label='Name'
            placeholder='Name'
            onChange={this.handleChange}
            value={this.state.email} />

          <Form.Input
            type='password'
            label='Old Password'
            name='old_password'
            placeholder='Old'
            onChange={this.handleChange}
            value={this.state.old_password} />

          <Form.Input
            type='password'
            label='New Password'
            name='new_password'
            placeholder='New'
            onChange={this.handleChange}
            value={this.state.new_password} />

          <Form.Button fluid basic color='teal' type='submit' content='Change Password' />
        </Form>
      </Container>
    )
  }
}

export default ChangePassword
