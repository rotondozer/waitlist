import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: '',
      pwConfirm: '',
      user: ''
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const apiBaseUrl = 'http://localhost:4741'
    const self = this

    axios({
      url: apiBaseUrl + '/sign-up',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        'credentials': {
          'email': self.state.email,
          'password': self.state.password,
          'password_confirmation': self.state.pwConfirm
        }
      }
    })
      .then((response) => {
        console.log(response)
        this.setState({
          user: response.user
        })
      })
      .catch((error) => console.log(error))
    this.setState({
      email: '',
      password: '',
      pwConfirm: ''
    })
  }

  render () {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          {/* Storing username and password values in state variables which change on each keystroke in onClick (onChange?) */}
          <input placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} value={this.state.email}></input>
          <input placeholder='Password' type='password' onChange={(event) => this.setState({password: event.target.value})} value={this.state.password}></input>
          <input placeholder='Confirm Password' type='password' onChange={(event) => this.setState({pwConfirm: event.target.value})} value={this.state.pwConfirm}></input>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default Register
