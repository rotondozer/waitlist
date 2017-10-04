import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const apiBaseUrl = 'http://localhost:4741'
    const self = this

    axios({
      url: apiBaseUrl + '/sign-in',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        'credentials': {
          'email': self.state.email,
          'password': self.state.password
        }
      }
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    this.setState({
      email: '',
      password: ''
    })
  }

  render () {
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          {/* Storing username and password values in state variables which change on each keystroke in onClick (onChange?) */}
          <input placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} value={this.state.email}></input>
          <input placeholder='Password' type='password' onChange={(event) => this.setState({password: event.target.value})} value={this.state.password}></input>

          <button type='submit'>Sign In</button>
        </form>
      </div>
    )
  }
}

export default Login
