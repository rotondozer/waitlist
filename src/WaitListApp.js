import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Input, Menu, Segment } from 'semantic-ui-react'

import Tables from './Tables'
import Waitlist from './Waitlist'
import Settings from './Settings'
import AddParty from './AddParty'
import AddTable from './AddTable'
import Home from './Home'
import Login from './Login'
import Register from './Register'

class WaitListApp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activeItem: 'Home',
      user: 'Not Signed In',
      token: '',
      user_id: '',
      signed_in: false
    }
    this.setAuthInfo = this.setAuthInfo.bind(this)
    this.changeSignedInStatus = this.changeSignedInStatus.bind(this)
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
        <Login setAuthInfo={this.setAuthInfo} changeSignedInStatus={this.changeSignedInStatus}/>
      )}/>
    }

    return (
      <Router>
        <div>

          <h1 className='restaurant-name' >Your Restaurant Name</h1>
          <h4 className='username' >{this.state.user}</h4>

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
              <Register setAuthInfo={this.setAuthInfo}/>
            )} />

            <Route path='/tables' render={() => (
              <Tables user_id={this.state.user_id} token={this.state.token} />
            )} />
            <Route path='/waitlist' render={() => (
              <Waitlist user_id={this.state.user_id} token={this.state.token} />
            )} />
            <Route path='/settings' render={() => (
              <Settings changeSignedInStatus={this.changeSignedInStatus}
                setAuthInfo={this.setAuthInfo}
                user_id={this.state.user_id}
                token={this.state.token} />
            )} />
            <Route path='/add_parties' render={() => (
              <AddParty user_id={this.state.user_id} token={this.state.token} />
            )} />
            <Route path='/add_tables' render={() => (
              <AddTable user_id={this.state.user_id} token={this.state.token} />
            )} />
          </Segment>
        </div>
      </Router>
    )
  }
}

export default WaitListApp
