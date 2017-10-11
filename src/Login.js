import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

class Login extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: '',
      user: '',
      signedIn: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSuccessUpdateState = this.onSuccessUpdateState.bind(this)
  }

  onSuccessUpdateState () {
    this.setState({
      email: '',
      password: '',
      signedIn: true
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const apiBaseUrl = 'https://waitlist-api.herokuapp.com'
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
      .then((response) => {
        this.props.setAuthInfo(response.data.user.email, response.data.user.token, response.data.user.id)
        console.log('EMAIL: ' + response.data.user.email)
        console.log('ID: '+ response.data.user.id)
        console.log('TOKEN: '+ response.data.user.token)
      })
      .then(() => this.onSuccessUpdateState())
      .catch((error) => console.log(error))

  }

  render () {
    if (this.state.signedIn) {
      this.setState({signedIn: false})
      return <Redirect push to='/' />
    }
    return (
      <div>
        <h2>Sign In</h2>
        <form className='ui form' onSubmit={(event) => this.handleSubmit(event)}>
          {/* Storing username and password values in state variables which change on each keystroke in onClick (onChange?) */}
          <input placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} value={this.state.email}></input>
          <input placeholder='Password' type='password' onChange={(event) => this.setState({password: event.target.value})} value={this.state.password}></input>

          <button type='submit'>Employee Login</button>
        </form>
      </div>
    )
  }
}

export default Login
