import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Redirect } from 'react-router'
import Table from './Table.js'
import AllTables from './AllTables.js'
import AvailableTables from './AvailableTables.js'
import AllTableHistory from './AllTableHistory.js'
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

  render () {
    return (
      <Router>
        <div>
          <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>

          <Route path='/all_tables' render={() => (
            <AllTables user_id={this.props.user_id} token={this.props.token} />
          )} />

          <Route path='/available_tables' render={() => (
            <AvailableTables user_id={this.props.user_id} token={this.props.token} />
          )} />

          <Route path='/all_table_history' render={() => (
            <AllTableHistory user_id={this.props.user_id} token={this.props.token} />
          )} />

        </div>
      </Router>
    )
  }
}

export default Tables
