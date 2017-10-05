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

class WaitListApp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      token: '',
      user_id: ''
    }
  }

  setAuthInfo (token, user_id) {
    this.setState({
      token,
      user_id
    })
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Your Restaurant Name</h1>
          <nav>
            <Link to='/'>Home</Link>{'    '}
            <Link to='/tables'>Tables</Link>{'    '}
            <Link to='/waitlist'>WaitList</Link>{'    '}
            <Link to='/settings'>Settings</Link>{'    '}
          </nav>

          <Route something={'this'} path='/tables' component={Tables} />
          <Route path='/waitlist' component={Waitlist} />
          <Route path='/settings' component={Settings} />
          <Route path='/add_parties' component={AddParty} />
          <Route path='/edit_parties' component={EditParty} />
        </div>
      </Router>
    )
  }
}

const withRouteProps = (...props) => (
  <Route {...props} {...props.route.props} />
)

export default WaitListApp
