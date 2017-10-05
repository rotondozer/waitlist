import React, { Component } from 'react'
import Login from './Login.js'
import Register from './Register.js'
import axios from 'axios'

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

  signOut (event) {
    event.preventDefault()
    const apiBaseUrl = 'http://localhost:4741'
    const self = this
    axios({
      url: apiBaseUrl + '/sign-out/' + self.props.user_id,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + self.props.token
      }
    })
      .then((response) => console.log(response))
      .then(self.props.setAuthInfo('','',''))
      .catch((error) => console.log(error))
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

        <input type='button' onClick={(event) => this.signOut(event)} value={'Sign Out'}/>
      </div>
    )
  }
}

export default Settings
