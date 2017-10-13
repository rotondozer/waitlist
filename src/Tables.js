import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Redirect } from 'react-router'
import Table from './Table.js'
import AllTables from './AllTables.js'
import TablesVertMenu from './TablesVertMenu'
import EditTable from './EditTable'
import axios from 'axios'

class Tables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      menuItem: 'all'
    }
    this.getActiveMenuItem = this.getActiveMenuItem.bind(this)
  }

  getActiveMenuItem (activeMenuItem) {
    console.log('Input = ' + activeMenuItem)
    this.setState({
      menuItem: activeMenuItem
    })
  }

  redirectToActiveMenuItem () {
    console.log('render ' + this.state.menuItem)
    const redirect = <Redirect to={'/'+this.state.menuItem+'_tables'} />
    return redirect
  }

  render () {
    const redirect = this.redirectToActiveMenuItem()

    console.log(redirect)
    return (
      <Router>
        <div>
          <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>
          {redirect}

          <Route path='/all_tables' render={() => (
            <AllTables user_id={this.props.user_id} token={this.props.token} />
          )} />
          {this.state.menuItem}
        </div>
      </Router>
    )
  }
}

export default Tables
