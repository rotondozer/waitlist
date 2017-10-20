import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

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
      password: ''
    })
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
      .then((response) => {
        const user = response.data.user
        this.props.setAuthInfo(user.email, user.token, user.id)
        this.props._addNotification('success', 'Login Success!')
      })
      .then(() => this.props.changeSignedInStatus(true))
      .then(() => this.onSuccessUpdateState())
      .catch((error) => this.props._addNotification('error', 'Login Failure'))

  }

  render () {

    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' />
              {' '}Employee Log-in
            </Header>
            <Form size='large' onSubmit={(event) => this.handleSubmit(event)}>
              <Segment stacked>
                {/* Storing username and password values in state variables which change on each keystroke in onClick (onChange?) */}
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail'
                  onChange={(event) => this.setState({email: event.target.value})}
                  value={this.state.email}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(event) => this.setState({password: event.target.value})}
                  value={this.state.password}
                />
                {/*<input placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} value={this.state.email}></input>
                <input placeholder='Password' type='password' onChange={(event) => this.setState({password: event.target.value})} value={this.state.password}></input>*/}

                <Button color='teal' fluid size='large' type='submit'>Employee Login</Button>

                {/* <NotificationContainer/> */}
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/create_account'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login
