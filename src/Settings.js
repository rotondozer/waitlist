import React, { Component } from 'react'
const $ = require('jquery')
const api = require('./auth/api.js')

class Settings extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      email: $('#email').val(),
      password: $('#password').val(),
      passwordConfirmation: $('#pwConfirm').val()
    })
    // console.log(this.state.tableNum)
  }

  render () {
    return (
      <div>
        {/* Add navbar with links to:
          All,
          Available,
          Ready to Queue (unavailable but unassigned)
          In Queue (unavailable and assigned),
          History
           */}
        <h2>Sign Up:</h2>
        <form onSubmit={api.signUp(this.state.email, this.state.password, this.state.pwConfirm)}>
          <input placeholder='Email' onChange={this.handleChange} id='email'></input>
          <input placeholder='Password' type='password' onChange={this.handleChange} id='password'></input>
          <input placeholder='Confirm Password' type='password' onChange={this.handleChange} id='pwConfirm'></input>

          <button>Sign Up</button>
        </form>

        <h2>Sign In</h2>
        <form onSubmit={api.signIn(this.state.email, this.state.password)}>
          <input placeholder='Email' onChange={this.handleChange} id='email'></input>
          <input placeholder='Password' type='password' onChange={this.handleChange} id='password'></input>

          <button>Sign In</button>
        </form>
      </div>
    )
  }
}

export default Settings
