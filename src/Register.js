import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Register extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: '',
      pwConfirm: '',
      user: ''
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const apiBaseUrl = 'https://waitlist-api.herokuapp.com'
    const self = this
    axios({
      url: apiBaseUrl + '/sign-up',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        'credentials': {
          'email': self.state.email,
          'password': self.state.password,
          'password_confirmation': self.state.pwConfirm
        }
      }
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    this.setState({
      email: '',
      password: '',
      pwConfirm: ''
    })
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
            <Header as='h2' color='orange' textAlign='center'>
              <Image src='/logo.png' />
              {' '}Employee New Account
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
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  onChange={(event) => this.setState({pwConfirm: event.target.value})}
                  value={this.state.pwConfirm}
                />
                {/*<input placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} value={this.state.email}></input>
                <input placeholder='Password' type='password' onChange={(event) => this.setState({password: event.target.value})} value={this.state.password}></input>*/}

                <Button color='orange' fluid size='large' type='submit'>Create Account</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Register
