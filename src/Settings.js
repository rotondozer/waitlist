import React, { Component } from 'react'
import axios from 'axios'

import ChangePassword from './ChangePassword'


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
      .then(self.props.setAuthInfo('Not Signed In','',''))
      .then(self.props.changeSignedInStatus(false))
      .catch((error) => console.log(error))
  }

  render () {
    return (
      <div>

        <ChangePassword setAuthInfo={this.props.setAuthInfo} user_id={this.props.user_id} token={this.props.token}/>

        {/* LOG OUT BUTTON */}
        <input type='button' onClick={(event) => this.signOut(event)} value={'Logout'}/>
      </div>
    )
  }
}

export default Settings
