import React, { Component } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Tables from './Tables'
import Waitlist from './Waitlist'
import Settings from './Settings'
import AddParty from './AddParty'
import EditParty from './EditParty'
import AddTable from './AddTable'
import Home from './Home'

class WaitListApp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      user: 'Not Signed In',
      token: '',
      user_id: ''
    }
    this.setAuthInfo = this.setAuthInfo.bind(this)
  }

  // This is more of a GET auth info
  setAuthInfo (user, token, user_id) {
    this.setState({
      user,
      token,
      user_id
    })
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <h1 className='restaurant-name' >Your Restaurant Name</h1>
            <h4 className='username' >{this.state.user}</h4>
            <div className='navbar'>
              <nav>
                <Link className='navlinks' to='/'>Home</Link>{'    '}
                <Link className='navlinks' to='/tables'>Tables</Link>{'    '}
                <Link className='navlinks' to='/waitlist'>WaitList</Link>{'    '}
                <Link className='navlinks' to='/settings'>Settings</Link>{'    '}
              </nav>
            </div>
          </header>

          <Route exact path='/' component={Home}/>

          <Route path='/tables' render={() => (
            <Tables user_id={this.state.user_id} token={this.state.token} />
          )} />
          <Route path='/waitlist' render={() => (
            <Waitlist user_id={this.state.user_id} token={this.state.token} />
          )} />
          <Route path='/settings' render={() => (
            <Settings setAuthInfo={this.setAuthInfo} user_id={this.state.user_id} token={this.state.token} />
          )} />
          <Route path='/add_parties' render={() => (
            <AddParty user_id={this.state.user_id} token={this.state.token} />
          )} />
          <Route path='/add_tables' render={() => (
            <AddTable user_id={this.state.user_id} token={this.state.token} />
          )} />
          {/*<Route path='/edit_parties' component={EditParty} />*/}
        </div>
      </Router>
    )
  }
}

export default WaitListApp
