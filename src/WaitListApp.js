import React, { Component } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Tables from './Tables'

class WaitListApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Your Restaurant Name</h1>
          <nav>
            <Link to='/tables'>Tables</Link>{'    '}
          </nav>


          <Route path='/tables' component={Tables} />

        </div>
      </Router>
    )
  }
}

export default WaitListApp
