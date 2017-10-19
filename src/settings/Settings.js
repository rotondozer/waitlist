import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Button,
  Grid
} from 'semantic-ui-react'

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
      .then(this.props.handleMessage('yellow', 'Signed Out'))
      .then(self.props.setAuthInfo('Not Signed In','',''))
      .then(self.props.changeSignedInStatus(false))
      .catch((error) => this.props.handleMessage('red', 'Something went wrong.'))
  }

  render () {
    return (
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column mobile={12} tablet={8} computer={8}>
              <ChangePassword setAuthInfo={this.props.setAuthInfo} user_id={this.props.user_id} token={this.props.token} handleMessage={this.props.handleMessage}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={12} tablet={8} computer={8}>
              {/* LOG OUT BUTTON */}
              <Button fluid
                basic color='red'
                type='button'
                onClick={(event) => this.signOut(event)}
                content='Logout'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default Settings
