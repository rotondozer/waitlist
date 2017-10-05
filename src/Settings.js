import React, { Component } from 'react'
import Login from './Login.js'
import Register from './Register.js'

class Settings extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      user: ''
    }
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
        <Register setAuthInfo={this.props.setAuthInfo}/>

        <Login setAuthInfo={this.props.setAuthInfo}/>
      </div>
    )
  }
}

export default Settings
