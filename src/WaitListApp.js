import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {
  Input,
  Menu,
  Segment,
  Container,
  Header,
  Message,
  Button
} from 'semantic-ui-react'

import Tables from './tables/Tables.js'
import Waitlist from './waitlist/Waitlist.js'
import Settings from './settings/Settings.js'
import AddParty from './waitlist/AddParty'
import AddTable from './tables/AddTable'
import Home from './home/Home.js'
import Login from './home/Login.js'
import Register from './home/Register.js'

class WaitListApp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activeItem: 'Home',
      user: 'Not Signed In',
      token: '',
      user_id: '',
      signed_in: false,
      displayMessage: false,
      displayMessageContent: '',
      displayMessageType: '',
    }
    this.setAuthInfo = this.setAuthInfo.bind(this)
    this.changeSignedInStatus = this.changeSignedInStatus.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.closeMessage = this.closeMessage.bind(this)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // This is more of a GET auth info
  setAuthInfo (user, token, user_id) {
    this.setState({
      user,
      token,
      user_id
    })
  }

  changeSignedInStatus (value) {
    this.setState({
      signed_in: value
    })
  }

  handleMessage (type, content) {
    // TODO move all display data into one object
    this.setState({
      displayMessage: true,
      displayMessageContent: content,
      displayMessageType: type
    })
  }

  closeMessage () {
    this.setState({
      displayMessage: false
    })
  }

  render() {
    const { activeItem } = this.state

    // pull this out into seperate function?
    let homeOrLogin
    if (this.state.signed_in) {
      homeOrLogin = <Route exact path='/' render={() => (
        <Home />
      )}/>
    } else {
      homeOrLogin = <Route exact path='/' render={() => (
        <Login setAuthInfo={this.setAuthInfo} changeSignedInStatus={this.changeSignedInStatus} handleMessage={this.handleMessage}/>
      )}/>
    }

    let displayMessage
    if (this.state.displayMessage) {
      displayMessage = <Message
        compact
        attached='top'
        color={this.state.displayMessageType}
        onDismiss={this.closeMessage} >
        <Message.Header>{this.state.displayMessageContent}</Message.Header>
        {/* <Button onClick={this.closeMessage}>Close</Button> */}
      </Message>
    }

    return (
      <Router className='outer-frame'>
        <Container>
          <Header as='h1' content='Your Restaurant Name' floated='left' />
          <Header as='h3' content={this.state.user} floated='right'/>
          {displayMessage}
          <Menu attached='top' tabular>
            <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
            <Menu.Item as={Link} to='/tables' name='Tables' active={activeItem === 'Tables'} onClick={this.handleItemClick} />
            <Menu.Item as={Link} to='/waitlist' name='Waitlist' active={activeItem === 'Waitlist'} onClick={this.handleItemClick} />
            <Menu.Item as={Link} to='/settings' name='Settings' active={activeItem === 'Settings'} onClick={this.handleItemClick} />

            <Menu.Menu position='right'>
              <Menu.Item>
                <Input transparent icon={{ name: 'search', link: true }} placeholder='Search users...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Segment attached='bottom'>
            {homeOrLogin}

            <Route path='/create_account' render={() => (
              <Register handleMessage={this.handleMessage} setAuthInfo={this.setAuthInfo} handleMessage={this.handleMessage}/>
            )} />
            <Route path='/tables' render={() => (
              <Tables user_id={this.state.user_id} token={this.state.token} handleMessage={this.handleMessage}/>
            )} />
            <Route path='/waitlist' render={() => (
              <Waitlist user_id={this.state.user_id} token={this.state.token} handleMessage={this.handleMessage}/>
            )} />
            <Route path='/settings' render={() => (
              <Settings changeSignedInStatus={this.changeSignedInStatus}
                setAuthInfo={this.setAuthInfo}
                user_id={this.state.user_id}
                token={this.state.token}
                handleMessage={this.handleMessage} />
            )} />
            <Route path='/add_parties' render={() => (
              <AddParty user_id={this.state.user_id} token={this.state.token} handleMessage={this.handleMessage}/>
            )} />
            <Route path='/add_tables' render={() => (
              <AddTable user_id={this.state.user_id} token={this.state.token} handleMessage={this.handleMessage}/>
            )} />
          </Segment>
        </Container>
      </Router>
    )
  }
}

export default WaitListApp
