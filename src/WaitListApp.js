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

class WaitListApp extends Component {
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

          <Route path='/tables' component={Tables} />
          <Route path='/waitlist' component={Waitlist} />
          <Route path='/settings' component={Settings} />

        </div>
      </Router>
    )
  }
}

export default WaitListApp
