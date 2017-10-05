import React, { Component } from 'react'
import { Redirect } from 'react-router'
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
      url: 'http://localhost:4741/change-password/' + self.props.user_id,
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
      .then((response) => console.log(response))
      .then(this.onSuccessUpdateState)
      .catch((error) => console.log(error))
  }


  render () {
    if (this.state.changePassword) {
      this.setState({changePassword: false})
      return <Redirect push to='/' />
    }
    return (
      <div>
        <h2>Change Password</h2>
        <form onSubmit={this.changePassword}>
          <input name='email' placeholder='email' onChange={this.handleChange} value={this.state.email} />

          <input type='password' name='old_password' placeholder='old_password' onChange={this.handleChange} value={this.state.old_password} />

          <input type='password' name='new_password' placeholder='new_password' onChange={this.handleChange} value={this.state.new_password} />

          <button type='submit'>Change Password</button>
        </form>
      </div>
    )
  }
}

export default ChangePassword
