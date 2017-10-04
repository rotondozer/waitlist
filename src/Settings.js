import React, { Component } from 'react'
import Login from './Login.js'
import Register from './Register.js'
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
        <Register />

        <Login />
      </div>
    )
  }
}

export default Settings
